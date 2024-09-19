/* eslint-disable camelcase */
const db = require("../../database/client");

const insert = (artist) => {
  return db.query("INSERT INTO artist(pseudo) VALUES (?)", [artist]);
};

const getByName = (pseudo) => {
  return db.query(
    "SELECT * FROM artist WHERE pseudo LIKE concat('%', ?, '%') LIMIT 1;",
    [pseudo]
  );
};

const insertInArtistWork = (artist, work) => {
  return db.query("INSERT INTO artist_work(Artist_id, Work_id) VALUES (?, ?)", [
    artist,
    work,
  ]);
};

const updateArtistInArtistWork = (Artist_id, Work_id) => {
  return db.query("UPDATE artist_work SET Artist_id = ? WHERE Work_id =?", [
    Artist_id,
    Work_id,
  ]);
};

module.exports = {
  insert,
  getByName,
  insertInArtistWork,
  updateArtistInArtistWork,
};
