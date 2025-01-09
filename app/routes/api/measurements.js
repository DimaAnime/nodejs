const express = require("express");

const {
    getMeasurements,
    getMeasurementsById
    } = require("../../controllers/measurements")


const router = express.Router();



router.route("/")
    .get(getMeasurements);

router.get("/:id",getMeasurementsById);

module.exports = router;