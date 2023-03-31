const MongoClient = require("mongodb").MongoClient;
const MongoUtil = require("../MongoUtil.js");
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB= "project2_Quizholics"
const collection = "Genre"



module.exports = {
    async getAllGenre(req, res) {
        const db = await MongoUtil.connect(MONGO_URI,DB);

        const result = await db.collection(collection).find().toArray()
        res.json({
            result
        })
        
    },


    async updateTopic(req,res) {
        const db = await MongoUtil.connect(MONGO_URI,DB);
        let topic=req.params.topic
        const update = req.body.quizId
        console.log(req.body)
        try {
            
            const result = await db.collection(collection).findOneAndUpdate({ "topic": topic },
                {
                    "$push":{quizId: update}

                        

                })

            res.send("Topic Updated")

        } catch (err) {
            console.log(err)
            res.send("failed")
        }


    },

    async getTopic(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);
        let topic = req.params.topic
        console.log(topic)
         
        try {

            const result = await db.collection(collection).find({ "topic": topic }).toArray()
            res.json({
                result
            })
        } catch (err) {
            console.log(err)
            res.send("failed")
        }
    },



}