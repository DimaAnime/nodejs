const express = require("express");


const apiRouter = require("./api");
const rootRouter = require("./root");
const authRouter = require("./auth");

const router = express.Router();


router.use("/auth", authRouter);
router.use("/api", apiRouter);
router.use("/",rootRouter);

module.exports = router