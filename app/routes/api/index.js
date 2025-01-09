const express = require("express");

const usersRouter = require("./users");
const stationsRouter = require("./stations");
const measurementsRouter = require("./measurements");

const router = express.Router();

router.use("/users",usersRouter);
router.use("/stations",stationsRouter);
router.use("/measurements",measurementsRouter);

module.exports = router;