const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const loginMiddleware = require("../middlewares/login.middleware");
router.get("/login", controller.index);
router.post("/login", loginMiddleware,controller.login);
module.exports = router;
