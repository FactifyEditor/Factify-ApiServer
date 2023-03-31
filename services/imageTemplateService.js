import model from '../models/index.js'

const {imageTemplateModel} = model;

const getAllImageTemplates = async () => {
  return await imageTemplateModel.find();
};

const createImageTemplate = async (imageTemplate) => {
  return await imageTemplateModel.create(imageTemplate);
};
const getImageTemplateById = async (id) => {
  return await imageTemplateModel.findById(id);
};

const updateImageTemplate = async (id, imageTemplate) => {
  return await imageTemplateModel.findByIdAndUpdate(id, imageTemplate);
};

const deleteImageTemplate = async (id) => {
  return await imageTemplateModel.findByIdAndDelete(id);
};

export default {
    getAllImageTemplates,
    createImageTemplate,
    getImageTemplateById,
    updateImageTemplate,
    deleteImageTemplate
}