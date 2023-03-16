const userController = require("./controller/userController")
const quizController = require("./controller/quizController")
const genreController = require("./controller/genreController")


module.exports = (app) => {
    app.get("/",function(req,res){
        res.send("yay")
    })
    // this is to get one user
    app.get('/user/:userid', userController.getUser)

    app.get("/users",userController.getAllUsers)

    app.get("/quiz",quizController.getAllQuiz)

    app.get("/genre", genreController.getAllGenre)
}
