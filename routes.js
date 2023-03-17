const userController = require("./controller/userController")
const quizController = require("./controller/quizController")
const genreController = require("./controller/genreController")


module.exports = (app) => {
    app.get("/",function(req,res){
        res.send("yay")
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







    app.get("/quiz",quizController.getAllQuiz)

    app.get("/genre", genreController.getAllGenre)

    
}
