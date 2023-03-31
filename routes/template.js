import express from "express";
import controller from "../controller/index.js";
import  uploadHandler  from "../middleware/uploadMultiFile.js";
const { audioTemplateController,videoTemplateController,imageTemplateController} = controller;
const {
    getAllAudioTemplates,
    createAudioTemplate,
    getAudioTemplateById,
    updateAudioTemplate,
    deleteAudioTemplate,
  } = audioTemplateController
  const {
    getAllVideoTemplates,
    createVideoTemplate,
    getVideoTemplateById,
    updateVideoTemplate,
    deleteVideoTemplate,
  } = videoTemplateController
  const {
    getAllImageTemplates,
    createImageTemplate,
    getImageTemplateById,
    updateImageTemplate,
    deleteImageTemplate,
  } = imageTemplateController

const router = express.Router();
router.route("/audio").get(getAllAudioTemplates).post(createAudioTemplate);
router.route("/audio/:id").get(getAudioTemplateById).put(updateAudioTemplate).delete(deleteAudioTemplate);

router.route("/video").get(getAllVideoTemplates).post(createVideoTemplate);
router.route("/video/:id").get(getVideoTemplateById).put(updateVideoTemplate).delete(deleteVideoTemplate);

router.route("/image").get(getAllImageTemplates).post(createImageTemplate);
router.route("/image/:id").get(getImageTemplateById).put(updateImageTemplate).delete(deleteImageTemplate);

export default  router;