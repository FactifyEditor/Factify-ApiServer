import model from './../models/index.js'

const {ratingModel} = model;

const getAllRatings = async () => {
  return await ratingModel.find();
};

const createRating = async (rating) => {
  return await ratingModel.create(rating);
};
const getRatingById = async (id) => {
  return await ratingModel.findById(id);
};

const updateRating = async (id, rating) => {
  return await ratingModel.findByIdAndUpdate(id, rating);
};

const deleteRating = async (id) => {
  return await ratingModel.findByIdAndDelete(id);
};

export default {
    getAllRatings,
    createRating,
    getRatingById,
    updateRating,
    deleteRating
}