const db = require("../../database/client");

const findAll = () => {
  return db.query("SELECT * FROM street_art_hunterz.location");
};

const getLocationById = (id) => {
  return db.query(
    "SELECT l.description, l.name, l.lat, l.lng, w.* FROM street_art_hunterz.location AS l LEFT JOIN street_art_hunterz.work AS w ON l.id = w.location_id WHERE l.id =?",
    [id]
  );
};

const getLocationByPostalCode = (postalCode) => {
  return db.query(
    `
    SELECT l.*
    FROM street_art_hunterz.location AS l where postalcode = ?
  `,
    [postalCode]
  );
};

module.exports = {
  findAll,
  getLocationById,
  getLocationByPostalCode,
};
