const MongoClient = require("mongodb").MongoClient;
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

        const result = await db.collection(userCollection).find().toArray()
        res.send("userUpdated")
    },

    async deleteUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);

        const result = await db.collection(userCollection).findOne()
    },

    async getUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);

        const result = await db.collection(userCollection).findOne()
        res.json({
            result
        })
    },

    async addUser(req, res) {
        const db = await MongoUtil.connect(MONGO_URI, DB);

        const result = await db.collection(userCollection).find().toArray()
    }




}