const locationModel = require("../models/location.model");

const getAll = async (req, res, next) => {
  try {
    const [location] = await locationModel.findAll();
    res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

const getSpotZoneById = async (req, res, next) => {
  try {
    const locationId = req.params.location;

    // Utilisez le modèle location pour récupérer les données d'emplacement et l'image associée
    const [locationData] = await locationModel.getLocationById(locationId);

    // Vérifiez si l'image est présente dans les données
    const imageData = locationData.work_image || null;

    res.status(200).json({ location: locationData, image: imageData });
  } catch (error) {
    console.error("Error in getSpotZoneById:", error);
    if (error.name === "NotFoundError") {
      res.status(404).json({ error: "Location not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }

    next(error);
  }
};

module.exports = {
  getAll,
  getSpotZoneById,
};
