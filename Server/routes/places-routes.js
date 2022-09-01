const express = require("express");
const router = express.Router();

const PlacesControllers = require("../controllers/places-controllers");

router.get("/:pid", PlacesControllers.getPlaceById);
router.get("/user/:uid", PlacesControllers.getPlacesByUserId);

router.post("/", PlacesControllers.createPlace)

router.patch('/:pid', PlacesControllers.updatePlace)

router.delete('/:pid', PlacesControllers.deletePlace)

module.exports = router;
