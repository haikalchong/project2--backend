const express = require("express");
const { ObjectId } = require("mongodb");
const cors = require("cors")

const routes= require("./routes")






const app = express();
routes(app)
app.use(express.json());
app.use(cors())



app.listen(2999,function(){
    console.log("server has started")
})