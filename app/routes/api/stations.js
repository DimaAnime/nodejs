const express = require("express");

const {
    getStations,
    getStationsById
    } = require("../../controllers/stations")


const router = express.Router();



router.route("/")
    .get(getStations);

router.get("/:id",getStationsById);

module.exports = router;