import  service  from "./../services/index.js";
const {ratingService} =service

const getAllRatings = async (req, res) => {
  try {
    const ratings = await ratingService.getAllRatings();
    res.json({ data: ratings, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRating = async (req, res) => {
  try {
    const rating = await ratingService.createRating(req.body);
    res.json({ data: rating, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRatingById = async (req, res) => {
  try {
    const rating = await ratingService.getRatingById(req.params.id);
    res.json({ data: rating, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRating = async (req, res) => {
  try {
    const rating = await ratingService.updateRating(req.params.id, req.body);
    res.json({ data: rating, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRating = async (req, res) => {
  try {
    const rating = await ratingService.deleteRating(req.params.id);
    res.json({ data: rating, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
getAllRatings,
createRating,
updateRating,
deleteRating,
getRatingById
}