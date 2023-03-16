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

    updateUser(req, res) {
        res.send("userUpdated")
    }




}