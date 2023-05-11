import model from './../models/index.js'

const { mediaModel } = model;

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
  return await mediaModel.findByIdAndUpdate(id, { $set: media });
}
  ;
const deleteMedia = async (idsToDelete) => {
  return await mediaModel.deleteMany({ _id: { $in: idsToDelete } });
};
const publishMedia = async (idsToDelete) => {
  return await mediaModel.updateMany({ _id: { $in: idsToDelete } }, { $set: { isPublished: true, publishedDate: Date.now() } });
};
export default {
  getAllMedias,
  createMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  publishMedia
}