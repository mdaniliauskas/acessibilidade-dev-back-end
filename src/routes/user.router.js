const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.use(express.json());

router.post("/user/pre-signup", userController.preSignup);

router.get("/user/:id", userController.getUser);

router.put("/user", userController.update);

router.delete("/user/:id", userController.remove);

module.exports = router;
