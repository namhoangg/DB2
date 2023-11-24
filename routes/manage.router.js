const express = require("express");
const router = express.Router();
const controller = require("../controllers/manage.controller");
const registerMiddleware = require("../middlewares/register.middleware");
router.get("/", controller.index);
router.post("/register", registerMiddleware.register, controller.register);
router.get("/patient", controller.patient);
router.get("/patient/detail/:id", controller.patientDetail);
router.get("/doctor", controller.doctor);
router.get("/doctor/detail/:id", controller.doctorDetail);

module.exports = router;
