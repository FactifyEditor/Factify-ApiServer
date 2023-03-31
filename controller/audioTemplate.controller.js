import  service  from "../services/index.js";
const {templateService} =service

const getAllAudioTemplates = async (req, res) => {
  try {
    const audioTemplates = await templateService.getAllTemplates();
    res.json({ data: audioTemplates, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAudioTemplate = async (req, res) => {
  try {
    const audioTemplate = await templateService.createTemplate(req.body);
    res.json({ data: audioTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAudioTemplateById = async (req, res) => {
  try {
    const audioTemplate = await templateService.getTemplateById(req.params.id);
    res.json({ data: audioTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAudioTemplate = async (req, res) => {
  try {
    const audioTemplate = await templateService.updateTemplate(req.params.id, req.body);
    res.json({ data: audioTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAudioTemplate = async (req, res) => {
  try {
    const audioTemplate = await templateService.deleteTemplate(req.params.id);
    res.json({ data: audioTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllAudioTemplates,
  createAudioTemplate,
  getAudioTemplateById,
  updateAudioTemplate,
  deleteAudioTemplate
}