import express from 'express';
import controller from '../controller/index.js';
const {userController} = controller;
const roleRouter = express.Router();
roleRouter.route("/")
	.get(userController.getRoles)
export default  roleRouter;
