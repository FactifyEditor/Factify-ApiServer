import model from './../models/index.js'

const {mediaModel} = model;

const getAllMedias = async (filter) => {
  return await mediaModel.find(filter).populate('creator').populate('language');
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
 // update media in mongodb
 return await mediaModel.findByIdAndUpdate(id, {$set: media});
}
;
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