
import controller from '../controller/index.js';
import express from  'express';
import  authJwt   from "./../middleware/authJwt.js";

const  router = express.Router();
router.post('/login', controller.authController.login );
router.get('/logout', controller.authController.checkLogin, controller.authController.logout );
router.post('/register', controller.authController.register);
router.post('/changePassword', controller.authController.changePassword );

 export default router;