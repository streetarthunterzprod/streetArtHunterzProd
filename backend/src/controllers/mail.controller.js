const sendMail = require("../send-mail");

const compliment = async (req, res, next) => {
  try {
    await sendMail.sendcompliment(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const question = async (req, res, next) => {
  try {
    await sendMail.sendquestion(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const claim = async (req, res, next) => {
  try {
    await sendMail.sendclaim(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  compliment,
  question,
  claim,
};
