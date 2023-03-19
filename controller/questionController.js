const MongoClient = require("mongodb").MongoClient;
const MongoUtil = require("../MongoUtil.js");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB= "project2_Quizholics"
const collection = "Questions"



module.exports = {

    //get all questions
    async updateQuestion(req,res){
        
    }






}