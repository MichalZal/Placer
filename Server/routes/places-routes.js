const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const PlacesControllers = require("../controllers/places-controllers");

router.get("/:pid", PlacesControllers.getPlaceById);
router.get("/user/:uid", PlacesControllers.getPlacesByUserId);

// POST > api/places/
router.post(
	"/",
	[
		check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
		check("address").not().isEmpty(),
	],
	PlacesControllers.createPlace
);

// PATCH > api/places/:pid
router.patch(
	"/:pid",
	[
		check("title").not().isEmpty(),
		check("description").isLength({ min: 5 }),
	],
	PlacesControllers.updatePlace
);

// DELETE > api/places/:pid
router.delete("/:pid", PlacesControllers.deletePlace);

module.exports = router;
