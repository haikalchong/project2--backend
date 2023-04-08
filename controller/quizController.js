const MongoClient = require("mongodb").MongoClient;
const MongoUtil = require("../MongoUtil.js");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB= "project2_Quizholics"
const collection = "Quiz"



module.exports = {
    async getAllQuiz(req, res) {
        const db = await MongoUtil.connect(MONGO_URI,DB);

        const result = await db.collection(collection).find().toArray()
        res.json({
            result
        })
        
    },

    async deleteQuiz(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let quizid= req.params.quizId
        const o_id = new ObjectId(quizid)
       try{ 
        
        const result= await db.collection(collection).deleteOne({"_id": o_id})

        res.send("quiz Deleted")

       }catch(err){
       
        res.send("failed")
       }
    },

    // async updateQuiz(req,res) {

    // }


    async addQuiz(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);

        try {
           const result =  await db.collection(collection).insertOne({
                "quizName": req.body.quizName,
                "topic": req.body.topic,
                "createdBy":req.body.createdBy,
                "quizLevel": req.body.quizLevel,
                "totalQuestions": req.body.totalQuestions,
                "questions": req.body.questions,
                "descriptions":req.body.descriptions
            })
            res.json(result)

        } catch (err) {
            res.send("error inserting quiz")
        }



    },


}