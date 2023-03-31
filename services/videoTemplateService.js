import model from '../models/index.js'

const {videoTemplateModel} = model;

const getAllVideoTemplates = async () => {
  return await videoTemplateModel.find();
};

const createVideoTemplate = async (videoTemplate) => {
  return await videoTemplateModel.create(videoTemplate);
};
const getVideoTemplateById = async (id) => {
  return await videoTemplateModel.findById(id);
};

const updateVideoTemplate = async (id, videoTemplate) => {
  return await videoTemplateModel.findByIdAndUpdate(id, videoTemplate);
};

const deleteVideoTemplate = async (id) => {
  return await videoTemplateModel.findByIdAndDelete(id);
};

export default {
    getAllVideoTemplates,
    createVideoTemplate,
    getVideoTemplateById,
    updateVideoTemplate,
    deleteVideoTemplate
}