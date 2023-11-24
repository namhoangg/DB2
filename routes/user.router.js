const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const loginMiddleware = require("../middlewares/login.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/login",controller.index);
router.post("/login", loginMiddleware, controller.login);
router.get("/logout", controller.logout);
module.exports = router;
