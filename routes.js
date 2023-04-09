const userController = require("./controller/userController")
const quizController = require("./controller/quizController")
const genreController = require("./controller/genreController")
const questionController = require("./controller/questionController")
const authentication = require("./middleware/authentication")



module.exports = (app) => {
    app.get("/",function(req,res){
        res.send("yay")
    })

    app.get("/welcome", authentication,function(req,res){
        res.send("Welcome Member")
    })
    // this is to get one user
    app.get('/user/:userid', userController.getUser)

    //this to get all user
    app.get("/users",userController.getAllUsers)

    //this to add user
    app.post("/user",userController.addUser)

    //this is to delete user
    app.delete("/user/:userid" , userController.deleteUser)

    //this is to update user
    app.put("/user/:userid", userController.updateUser)

    app.post("/login", userController.login)

    //add quiz for user for quiz created

    app.put("/userQuiz/:userid", userController.updateUserQuiz)




    //get all quiz
    app.get("/quiz",quizController.getAllQuiz)

    //add a quiz
    app.post("/quiz",quizController.addQuiz)

    //delete a quiz
    app.delete("/quiz/:quizId",quizController.deleteQuiz)

    //get user quiz
    app.get("/userGetQuiz/:id", quizController.getUserQuiz)

    //update a quiz
    // app.put("/quiz/:quizId".quizController.updateQuiz)



    // get all genre
    app.get("/genre", genreController.getAllGenre)

    app.get("/genre/:topic", genreController.getTopic)

    app.put("/genre/:topic",genreController.updateTopic)

    
}
