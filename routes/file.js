import express from 'express';
const router = express.Router();
import controller from '../controller/index.js';
const {
    uploadMultipleFiles
} = controller.fileController;

/**
 * process videos
 */
router.post('/upload', async (req, res) => {
    let response = await uploadMultipleFiles(req,res);
    return response;
});

export default router;