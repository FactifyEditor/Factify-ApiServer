import model from '../models/index.js'

const {audioTemplateModel} = model;

const getAllAudioTemplates = async () => {
  return await audioTemplateModel.find();
};

const createAudioTemplate = async (audioTemplate) => {
  return await audioTemplateModel.create(audioTemplate);
};
const getAudioTemplateById = async (id) => {
  return await audioTemplateModel.findById(id);
};

const updateAudioTemplate = async (id, audioTemplate) => {
  return await audioTemplateModel.findByIdAndUpdate(id, audioTemplate);
};

const deleteAudioTemplate = async (id) => {
  return await audioTemplateModel.findByIdAndDelete(id);
};

export default {
    getAllAudioTemplates,
    createAudioTemplate,
    getAudioTemplateById,
    updateAudioTemplate,
    deleteAudioTemplate
}