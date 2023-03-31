import express from "express";
import controller from "../controller/index.js";
const {ratingController} = controller;
const {
    getAllRatings,
    createRating,
    getRatingById,
    updateRating,
    deleteRating,
  } = ratingController

const router = express.Router();
router.route("/").get(getAllRatings).post(createRating);
router.route("/:id").get(getRatingById).put(updateRating).delete(deleteRating);

export default  router;