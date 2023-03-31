import  service  from "../services/index.js";
const {imageTemplateService} =service;
const getAllImageTemplates = async (req, res) => {
  try {
    const imageTemplates = await imageTemplateService.getAllImageTemplates();
    res.json({ data: imageTemplates, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createImageTemplate = async (req, res) => {
  try {
    const imageTemplate = await imageTemplateService.createImageTemplate(req.body);
    res.json({ data: imageTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getImageTemplateById = async (req, res) => {
  try {
    const imageTemplate = await imageTemplateService.getImageTemplateById(req.params.id);
    res.json({ data: imageTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateImageTemplate = async (req, res) => {
  try {
    const imageTemplate = await imageTemplateService.updateImageTemplate(req.params.id, req.body);
    res.json({ data: imageTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteImageTemplate = async (req, res) => {
  try {
    const imageTemplate = await imageTemplateService.deleteImageTemplate(req.params.id);
    res.json({ data: imageTemplate, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllImageTemplates,
  createImageTemplate,
  getImageTemplateById,
  updateImageTemplate,
  deleteImageTemplate
}