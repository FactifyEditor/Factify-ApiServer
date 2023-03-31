import  service  from "../services/index.js";
import uploader from '../controller/file.controller.js'

const {videoTemplateService} =service

const getAllVideoTemplates = async (req, res) => {
  try {
    const videoTemplates = await videoTemplateService.getAllVideoTemplates();
    res.json({ data: videoTemplates, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createVideoTemplate = async (req, res) => {
  try {
 
    const videoTemplate = await videoTemplateService.createVideoTemplate(req.body);
    res.json({ data: videoTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getVideoTemplateById = async (req, res) => {
  try {
    const videoTemplate = await videoTemplateService.getVideoTemplateById(req.params.id);
    res.json({ data: videoTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateVideoTemplate = async (req, res) => {
  try {
    const videoTemplate = await videoTemplateService.updateVideoTemplate(req.params.id, req.body);
    res.json({ data: videoTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteVideoTemplate = async (req, res) => {
  try {
    const videoTemplate = await videoTemplateService.deleteVideoTemplate(req.params.id);
    res.json({ data: videoTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllVideoTemplates,
  createVideoTemplate,
  getVideoTemplateById,
  updateVideoTemplate,
  deleteVideoTemplate
}