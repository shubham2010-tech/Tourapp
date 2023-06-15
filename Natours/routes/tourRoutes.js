const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router();

// router.param("id", (req, res, next, val) => {
//   console.log(`the id is : ${val}`);
//   next();
// });
// router.param("id", tourController.checkId);
router.route("/").get(tourController.getalltour).post(tourController.addtour);

router.route("/tour-stats").get(tourController.gettourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyplan);

router
  .route("/:id")
  .get(tourController.gettourbyid)
  .patch(tourController.updatetour)
  .delete(tourController.deletetour);

module.exports = router;
