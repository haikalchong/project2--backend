const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const MongoUtil = require("../MongoUtil.js");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB = "project2_Quizholics"
const userCollection = "Users"



module.exports = {
    async getAllUsers(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);

        const result = await db.collection(userCollection).find().toArray()
        res.json({
            result
        })

    },

    async updateUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let userid= req.params.userid
        const o_id = new ObjectId(userid)
        const update = req.body
       try{ 
        console.log(update)
        const result= await db.collection(userCollection).findOneAndUpdate({"_id": o_id},
        {
            "$set": 
               update
            
        })

        res.send("user Updated")

       }catch(err){
       console.log(err)
        res.send("failed")
       }
    },

    async deleteUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let userid= req.params.userid
        const o_id = new ObjectId(userid)
       try{ 
        
        const result= await db.collection(userCollection).deleteOne({"_id": o_id})

        res.send("user Deleted")

       }catch(err){
       
        res.send("failed")
       }
    },

    async getUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let userid= req.params.userid
        console.log(userid)
        const o_id = new ObjectId(userid)
       try{ 
        
        const result= await db.collection(userCollection).find({"_id": o_id}).toArray()
        res.json({
            result
        })
       }catch(err){
        console.log(err)
        res.send("failed")
       }
    },

    async addUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        
        try{
        db.collection(userCollection).insertOne({
            "firstName": req.body.firstName,
            "lastName" : req.body.lastName,
            "email" : req.body.email,
            "quizCreated": req.body.quizCreated,
            "quizDone" : req.body.quizDone,
            "memberSince" : req.body.memberSince
        })
        res.send("user created")

    }catch(err){
        res.send("error inserting user")
    }
        
        
        
    }




}