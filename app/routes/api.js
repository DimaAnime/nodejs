const express = require("express");
const {abacMiddleware,authenticateToken, aclMiddleware} = require("../middleware/api");
const apiRouter = require("./api/index");

//const getRootHeandler = require("../controllers/root");

const router = express.Router();




router.use("/",authenticateToken,aclMiddleware, apiRouter);

module.exports = router;