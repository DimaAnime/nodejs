const express = require("express");

const getRootHeandler = require("../controllers/root");

const router = express.Router();

router.get("/",getRootHeandler);

module.exports = router