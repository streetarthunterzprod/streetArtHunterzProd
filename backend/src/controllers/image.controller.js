/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const imageModel = require("../models/image.model");
const locationModel = require("../models/location.model");
const artistModel = require("../models/artist.model");

const add = async (req, res, next) => {
  try {
    const image = req.body;
    console.info(req.body, req.files);
    image.URL_image = `${req.protocol}://${req.get("host")}/upload/${
      req.files[0].filename
    }`;
    image.User_id = req.userID;
    const [[location]] = await locationModel.getLocationByPostalCode(
      image.postalCode
    );
    image.location_id = location ? location?.id : null;
    const [result] = await imageModel.insert(image);
    if (result.insertId) {
      if (req.body.artist) {
        const [[artistName]] = await artistModel.getByName(req.body.artist);
        if (artistName) {
          await artistModel.insertInArtistWork(artistName.id, result.insertId);
          res.sendStatus(201);
        } else {
          const [artist] = await artistModel.insert(req.body.artist);
          if (artist.insertId) {
            await artistModel.insertInArtistWork(
              artist.insertId,
              result.insertId
            );
            res.sendStatus(201);
          }
        }
      } else res.sendStatus(201);
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const [works] = await imageModel.findAll();
    res.status(200).json(works);
  } catch (error) {
    next(error);
  }
};
const getByUserId = async (req, res, next) => {
  try {
    const [workByUserId] = await imageModel.findByUserId(req.body.userID);
    if (workByUserId == null) {
      res.sendStatus(404);
    } else {
      res.json(workByUserId);
    }
  } catch (err) {
    next(err);
  }
};

const getAllNoValidate = async (req, res, next) => {
  try {
    const [works] = await imageModel.findAllNoValidate();
    res.json(works);
  } catch (err) {
    next(err);
  }
};

const getAllWUL = async (req, res, next) => {
  try {
    const [works] = await imageModel.findAll();
    res.status(200).json(works);
  } catch (err) {
    next(err);
  }
};

const approve = async (req, res, next) => {
  try {
    const workId = req.params.id;
    await imageModel.validateWork(workId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const erase = async (req, res, next) => {
  try {
    const workId = req.params.id;
    await imageModel.deleteWork(workId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateWorkLocalisation = async (req, res, next) => {
  try {
    const { latitude, longitude, id } = req.body;

    await imageModel.updateLocalisation(latitude, longitude, id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateArtistInAW = async (req, res, next) => {
  try {
    const { pseudo, Work_id } = req.body;

    // Vérifier si le pseudo de l'artiste existe
    const [[existingArtist]] = await artistModel.getByName(pseudo);
    const [[existArtistWork]] = await imageModel.findByIdInWA(Work_id);

    if (existingArtist) {
      const Artist_id = existingArtist.id;
      if (existArtistWork) {
        await artistModel.updateArtistInArtistWork(Artist_id, Work_id);
      } else {
        await artistModel.insertInArtistWork(Artist_id, Work_id);
      }
      res.sendStatus(204);
    } else {
      const [newArtist] = await artistModel.insert(pseudo);

      if (newArtist && newArtist.insertId) {
        const Artist_id = newArtist.insertId;

        if (existArtistWork) {
          await artistModel.updateArtistInArtistWork(Artist_id, Work_id);
        } else {
          await artistModel.insertInArtistWork(Artist_id, Work_id);
        }

        res.sendStatus(204);
      } else {
        // Si la création de l'artiste échoue, renvoyer une erreur
        res.status(500).send("Erreur lors de la création de l'artiste");
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  getAll,
  getByUserId,
  getAllNoValidate,
  getAllWUL,
  approve,
  erase,
  updateWorkLocalisation,
  updateArtistInAW,
};
