/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const db = require("../../database/client");

const insert = (work) => {
  const { latitude, longitude } = work;
  return db.query(
    "INSERT INTO work (latitude, longitude, image, User_id, isValidate, location_id) VALUES (?, ?, ?, ?, ?, ?)",
    [latitude, longitude, work.URL_image, work.User_id, 0, work.location_id]
  );
};

const findById = (id) => {
  return db.query("SELECT * FROM work WHERE id = ?", [id]);
};

const findByUserId = (user_id) => {
  return db.query("SELECT * FROM work WHERE isValidate=1 and User_id = ?", [
    user_id,
  ]);
};

const findAllNoValidate = () => {
  return db.query(
    `SELECT w.*, u.id AS user_id, u.pseudo AS user_pseudo, a.pseudo AS artist_pseudo, l.name AS location_name
    FROM work AS w
    JOIN user AS u ON w.User_id = u.id
    JOIN location AS l ON w.location_id = l.id
    LEFT JOIN artist_work AS aw ON w.id = aw.Work_id
    LEFT JOIN artist AS a ON aw.Artist_id = a.id
    WHERE w.isValidate = 0;`,
    []
  );
};

const findAll = () => {
  return db.query(
    `SELECT w.*, u.pseudo AS user_pseudo, u.id AS user_id, a.pseudo AS artist_pseudo, l.name AS location_name
    FROM work AS w
    JOIN user AS u ON w.User_id = u.id or u.id IS NULL
    JOIN location AS l ON w.location_id = l.id
    LEFT JOIN artist_work AS aw ON w.id = aw.Work_id
    LEFT JOIN artist AS a ON aw.Artist_id = a.id
    WHERE w.isValidate = 1;`,
    []
  );
};

const validateWork = (id) => {
  return db.query("UPDATE work SET isValidate = 1 WHERE id = ?", [id]);
};

const deleteWork = (id) => {
  return db.query("DELETE FROM work WHERE id = ?", [id]);
};

const getImageByLocationId = (id) => {
  return db.query(
    "Select image FROM `street_art_hunterz`.`work` WHERE location_id = ?",
    [id]
  );
};

const updateLocalisation = (latitude, longitude, id) => {
  return db.query("UPDATE work SET latitude = ?, longitude = ?  WHERE id = ?", [
    latitude,
    longitude,
    id,
  ]);
};

const findByIdInWA = (WorkID) => {
  return db.query("SELECT * FROM Artist_Work WHERE Work_id = ?", [WorkID]);
};

module.exports = {
  insert,
  findById,
  findByUserId,
  findAllNoValidate,
  findAll,
  validateWork,
  deleteWork,
  getImageByLocationId,
  updateLocalisation,
  findByIdInWA,
};
