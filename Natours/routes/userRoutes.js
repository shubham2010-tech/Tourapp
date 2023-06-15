const express = require("express");

const userController = require("./../controllers/userController");

const router = express.Router();
// Route for users
router.route("/").get(userController.getallusers).post(userController.adduser);

router
  .route("/:id")
  .get(userController.getuserbyid)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);

module.exports = router;
