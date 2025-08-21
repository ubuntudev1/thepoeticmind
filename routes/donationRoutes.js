const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

router.get("/", donationController.getDonatePage);
router.post("/pay", donationController.initiateDonation);
router.get("/callback", donationController.verifyDonation);

module.exports = router;
