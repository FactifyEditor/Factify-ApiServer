import express from "express";
import controller from "../controller/index.js";
const {languageController} = controller;
const {
    getAllLanguages,
    createLanguage,
    getLanguageById,
    updateLanguage,
    deleteLanguage,
  } = languageController

const router = express.Router();
router.route("/").get(getAllLanguages).post(createLanguage);
router.route("/:id").get(getLanguageById).put(updateLanguage).delete(deleteLanguage);

export default  router;