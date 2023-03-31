import model from './../models/index.js'

const {mediaModel} = model;

const getAllMedias = async () => {
  return await mediaModel.find().populate('creator').populate('language');
};
const createMedia = async (media) => {
  console.log(media)
  return await mediaModel.create(media);
};
const getMediaById = async (id) => {
  return await mediaModel.findById(id).populate('creator').populate('language');
};

// const updateMedia = async (id, media) => {
  
//   return await mediaModel.findByIdAndUpdate(id, {$set: media});
// };
const updateMedia = async (id, media) => {
  return await mediaModel.findByIdAndUpdate(id, {$set: media});
};
const deleteMedia = async (id) => {
  return await mediaModel.findByIdAndDelete(id);
};
export default {
    getAllMedias,
    createMedia,
    getMediaById,
    updateMedia,
    deleteMedia
}