const router = require("express").Router();

const userController = require("../controllers/user.controllers");
const auth = require("../middlewares/auth");

router.post("/user", auth.hashPassword, userController.add);
router.post("/user/login", userController.login);
router.get("/user", auth.isAuth, userController.getAll);
router.put("/user/changePassword", auth.isAuth, userController.updatePassword);

router.delete(
  "/user/:id/delete",
  auth.isAuth,
  auth.isAdmin,
  userController.erase
);
router.put(
  "/user/:id/score",
  auth.isAuth,
  auth.isAdmin,
  userController.incrementUserScore
);

router.get("/user/logout", auth.isAuth, userController.logout);
router.get("/user/me", auth.isAuth, userController.getCurrentUser);
router.get("/user/:id", auth.hashPassword, userController.getById);

module.exports = router;
