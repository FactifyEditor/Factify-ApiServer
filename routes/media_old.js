import express from 'express';
const router = express.Router();
import  
  controllers
from '../controller/index.js';
const {
    processVideos,
    processImages,
    processAudios
} = controllers.mediaController;

/**
 * process videos
 */
router.post('/createVideo', async (req, res) => {
    let inputJson = req.body;
    let finalVideo = await processVideos(inputJson);
    res.send({success:true,file:'audio3.mp4'})
});

/**
 * process  images
 */
router.post('/createImage',async (req, res) => {
  let inputJson = req.body.editSpec;
  let finalImage = await processImages(inputJson);
  res.download(finalImage);
});

/**
 * process audios
 */
router.post('/createAudio',async (req, res) => {
  let inputJson = req.body.editSpec;
  let finalImage = await processAudios(inputJson);
  res.sendSuccessResponse({finalImage});
});
/**
 * process video,audio,image
 */
router.post('/createAll', async(req, res) => {
  let inputJson = req.body.editSpec;
  let finalVideo = await processVideo(inputJson);
  let finalImage = await processImage(inputJson);
  let finalAudio = await processAudio(inputJson);
  res.send({finalImage,finalAudio,finalVideo});
})

export default  router;