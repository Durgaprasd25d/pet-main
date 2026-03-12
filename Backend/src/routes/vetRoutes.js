const express = require("express");
const router = express.Router();
const { getVets, getVetById } = require("../controllers/vetController");

router.get("/", getVets);
router.get("/:id", getVetById);

module.exports = router;
