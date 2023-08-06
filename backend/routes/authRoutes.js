const express = require("express");
const loginLimiter = require("../middleware/loginLimiter");
const router = express.Router();

router.route("/").post(loginLimiter);
router.route("/refresh").get();
router.route("/logout").post();

module.exports = router;
