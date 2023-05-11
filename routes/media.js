import express from "express";
import controller from "../controller/index.js";
const {mediaController} = controller;
import tokenValidator from '../middleware/authJwt.js'
const {
    getAllMedias,
    createMedia,
    getMediaById,
    updateMedia,
    deleteMedia,
    renderVideo,
    renderAudio,
    renderImage,
    convertTTSToAudio,
    renderAll,
    publishMedia
  } = mediaController

const router = express.Router();
router.route("/").get(tokenValidator.verifyToken,getAllMedias).post(tokenValidator.verifyToken,createMedia);
router.route("/:id").get(getMediaById).put(updateMedia)
router.delete("/", deleteMedia);
router.post("/publish", publishMedia);
router.route("/render-video").post(renderVideo);
router.route("/render-audio").post(renderAudio);
router.route("/render-image").post(renderImage);
router.route("/ttsToAudio").post(convertTTSToAudio);
router.route("/render-all").post(renderAll);
export default  router;