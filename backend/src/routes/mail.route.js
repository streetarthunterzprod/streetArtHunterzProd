const router = require("express").Router();

const mailController = require("../controllers/mail.controller");

router.post("/mail/compliment", mailController.compliment);
router.post("/mail/question", mailController.question);
router.post("/mail/claim", mailController.claim);

module.exports = router;
