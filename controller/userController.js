const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const MongoUtil = require("../MongoUtil.js");
const bcrypt = require("bcryptjs")
require('dotenv').config();
const jwt = require("jsonwebtoken")

const MONGO_URI = process.env.MONGO_URI;
const DB = "project2_Quizholics"
const collection = "Users"



module.exports = {
    async getAllUsers(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);

        const result = await db.collection(collection).find().toArray()
        res.json({
            result
        })

    },

    async updateUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let userid = req.params.userid
        const o_id = new ObjectId(userid)
        const update = req.body
        try {
            
            const result = await db.collection(collection).findOneAndUpdate({ "_id": o_id },
                {
                    "$set":
                        update,
                    
                    

                },
                {
                    returnNewDocument:true,
                    returnDocument:'after'
                })
                console.log("resuglt",result.value)

            res.json({result})

        } catch (err) {
            console.log(err)
            res.send("failed")
        }
    },

    async deleteUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let userid = req.params.userid
        const o_id = new ObjectId(userid)
        try {

            const result = await db.collection(collection).deleteOne({ "_id": o_id })

            res.send("user Deleted")

        } catch (err) {

            res.send("failed")
        }
    },

    async getUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let userid = req.params.userid
        console.log(userid)
        const o_id = new ObjectId(userid)
        try {

            const result = await db.collection(collection).find({ "_id": o_id }).toArray()
            res.json({
                result
            })
        } catch (err) {
            console.log(err)
            res.send("failed")
        }
    },

    async addUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);


        //username/email
        const oldUser = await db.collection(collection).findOne({ "username": req.body.username })
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Log in")
        }

        //encrypt password

        encrypytedPassword = await bcrypt.hash(req.body.password, 8)



        try {
            db.collection(collection).insertOne({
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "username": req.body.username,
                "quizCreated": req.body.quizCreated,
                "memberSince": req.body.memberSince,
                "password": encrypytedPassword
            })
            res.status(200).send("user created")

        } catch (err) {
            res.send("error inserting user")
        }



    },

    async login(req,res){
        const db = await MongoUtil.connect(MONGO_URI, DB)
        try{
            const username = req.body.username
            const password = req.body.password
            if (!(username && password)){
                res.status(400).send("All input is required");
            }
            const user= await db.collection(collection).findOne({"username":username})
            
            if(user && (await bcrypt.compare(password,user.password))){
                const token = jwt.sign(
                    {"username": username},
                    process.env.TOKEN_KEY,
                    {
                        "expiresIn": "12h"
                    }
                );
                user.token = token
                res.json(user).status(200)
            }else{
            res.status(400).send("Invalid email/password")}
            
            
        }catch(err){
            console.log(err)
            res.send("error logging in")
        }

    
    },

    async updateUserQuiz(req,res){

        const db = await MongoUtil.connect(MONGO_URI,DB);
        let userId=new ObjectId(req.params.userid)
        const update = req.body.quizId
        console.log(userId)
        try {
            
            const result = await db.collection(collection).findOneAndUpdate({ "_id": userId },
                {
                    "$push":{quizCreated: update}

                        

                })
                console.log(result)
            res.send("User Updated")

        } catch (err) {
            console.log(err)
            res.send("failed")
        }
    }
    




}