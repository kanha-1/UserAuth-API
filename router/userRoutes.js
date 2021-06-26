const router = require("express").Router();
const userController = require("../controller/userController");
const auth = require('../middleware/Auth')
// Register a user
router.post("/user/register", userController.register);
// Login a User
router.post("/user/login",userController.login)
// Get all the users from collection
router.get("/users", auth, userController.GetUsers);
// update a user by id
router.put("/user/update/:id", auth ,userController.UpdateUser);
// delete a user by id
router.delete("/user/delete/:id", auth ,userController.DeleteUser);


module.exports = router;
