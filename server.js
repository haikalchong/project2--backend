const express = require("express");
const { ObjectId } = require("mongodb");
const cors = require("cors")
require("body-parser")
const routes= require("./routes");






const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
routes(app)

app.listen(2999,function(){
    console.log("server has started")
})