/* eslint-disable consistent-return */
const argon = require("argon2");
const jwt = require("jsonwebtoken");

// hashing du password //
const hashingOptions = {
  type: argon.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  try {
    const hash = await argon.hash(password, hashingOptions);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Vérification utilisateur authentifié //
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentification required. Please log in" });
    }
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.body.userID = decoded.id;
    req.body.admin = decoded.admin;
    req.userID = decoded.id;
    req.admin = decoded.admin;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Invalid Authentification. Please log in again" });
  }
};

// Vérification utilisateur est admin //
const isAdmin = async (req, res, next) => {
  if (req.body.admin) {
    next();
  } else res.status(403);
};

// Stockage token pour raffraichisement de la page //

const renewToken = async (req, res, next) => {
  try {
    const token = req.cookies["auth-token"];

    if (token) {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      req.body.userID = decoded.id;
      req.body.admin = decoded.admin;

      // Vérification si le token expire dans les 2 prochains jours
      const twoDaysBeforeExpiration = Date.now() + 2 * 24 * 60 * 60 * 1000;

      if (decoded.exp * 1000 < twoDaysBeforeExpiration) {
        // Le token expire dans les 2 prochains jours, renouvellement du token
        const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes
        const newToken = jwt.sign(
          { id: req.body.userID, admin: req.body.admin },
          process.env.APP_SECRET,
          { expiresIn }
        );

        res.cookie("auth-token", newToken, {
          maxAge: expiresIn,
          httpOnly: true,
        });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json(error.message);
  }
};

module.exports = {
  hashPassword,
  isAuth,
  isAdmin,
  renewToken,
};
