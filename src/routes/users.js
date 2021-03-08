const express = require("express");
const router = express.Router();

// Controller
const usersController = require("../controllers/usersController");

// Middleware
const checkUser = require("../middleware/checkUser");
const {
	userValidationRules,
	userValidation,
} = require("../middleware/validation");

// Routes
router.get("/", usersController.getUsers);
router.post(
	"/",
	userValidationRules,
	userValidation,
	usersController.createUser
);
router.get("/:id", checkUser, usersController.getUser);
router.put("/:id", checkUser, usersController.changeUser);
router.delete("/:id", checkUser, usersController.deleteUser);
router.use("/*", (req, res, next) => {
	res.status(404).send("text error");
});

//Export
module.exports = router;
