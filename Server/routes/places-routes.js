const express = require("express");
const router = express.Router();

const PlacesControllers = require("../controllers/places-controllers");

router.get("/:pid", PlacesControllers.getPlaceById);
router.get("/user/:uid", PlacesControllers.getPlaceByUserId);

module.exports = router;
