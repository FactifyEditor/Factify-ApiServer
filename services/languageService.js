import model from './../models/index.js'

const {languageModel} = model;

const getAllLanguages = async () => {
  return await languageModel.find();
};

const createLanguage = async (language) => {
  return await languageModel.create(language);
};
const getLanguageById = async (id) => {
  return await languageModel.findById(id);
};

const updateLanguage = async (id, language) => {
  return await languageModel.findByIdAndUpdate(id, language);
};

const deleteLanguage = async (id) => {
  return await languageModel.findByIdAndDelete(id);
};

export default {
    getAllLanguages,
    createLanguage,
    getLanguageById,
    updateLanguage,
    deleteLanguage
}