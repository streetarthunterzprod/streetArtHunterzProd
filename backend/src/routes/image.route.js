const router = require("express").Router();

const imageController = require("../controllers/image.controller");
const fileUpload = require("../middlewares/fileUpload");
const auth = require("../middlewares/auth");

router.post("/image", auth.isAuth, fileUpload.any(), imageController.add);
router.get("/image", imageController.getAllWUL);
router.get("/image/user", imageController.getByUserId);
router.get(
  "/image/unvalidate",
  auth.isAuth,
  auth.isAdmin,
  imageController.getAllNoValidate
);
router.put(
  "/image/:id/validate",
  auth.isAuth,
  auth.isAdmin,
  imageController.approve
);

router.delete(
  "/image/:id/delete",
  auth.isAuth,
  auth.isAdmin,
  imageController.erase
);
router.put(
  "/image/:id/localisation",
  auth.isAuth,
  auth.isAdmin,
  imageController.updateWorkLocalisation
);
router.put(
  "/artist_work/:WorkId/update",
  auth.isAuth,
  auth.isAdmin,
  imageController.updateArtistInAW
);

module.exports = router;
