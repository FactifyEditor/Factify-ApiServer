import express from 'express';
import controller from '../controller/index.js';
const {userController} = controller;
const userRouter = express.Router();
console.log("test")
userRouter.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
userRouter.route("/:id")
	.get(userController.getUserById)
	.delete(userController.deleteUser)
	.put(userController.updateUser);
userRouter.route("/updatePassword/:id")
.put(userController.updatedPassword);
export default  userRouter;
