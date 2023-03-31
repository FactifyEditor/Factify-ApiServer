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
    convertTTSToAudio
  } = mediaController

const router = express.Router();
router.route("/").get(getAllMedias).post(tokenValidator.verifyToken,createMedia);
router.route("/:id").get(getMediaById).put(updateMedia).delete(deleteMedia);
router.route("/render-video").post(renderVideo);
router.route("/render-audio").post(renderAudio);
router.route("/render-image").post(renderImage);
router.route("/ttsToAudio").post(convertTTSToAudio);
export default  router;