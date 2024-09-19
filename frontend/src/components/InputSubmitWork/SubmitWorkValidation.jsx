/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import Map from "../Map/Map";
import ratPhotographer from "../../assets/images/img/Rat_photograph.png";
import "./submitWork.css";

function SubmitWorkValidation({ onNextStep, selectedImage }) {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [artist, setArtist] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState({
    lng: 2.3522,
    lat: 48.8566,
    zoom: 11,
  });

  const insertImage = async (newlng, newlat, imagePath) => {
    try {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${newlng},${newlat}.json?access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          const postalCode = data.features[0].place_name
            .split(", ")[1]
            .split(" ")[0];

          const form = new FormData();
          form.append("longitude", newlng);
          form.append("latitude", newlat);
          form.append("image", imagePath);
          form.append("entry", Date.now());
          form.append("postalCode", postalCode);

          // Ajoute l'artiste à la requête POST
          if (artist) {
            form.append("artist", artist);
          }

          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/image`,
            {
              method: "POST",
              body: form,
              credentials: "include",
            }
          );

          if (response.status === 201) {
            toast.success("Image inserted successfully!");
            console.info("Image inserted successfully");
          } else {
            toast.error("Error inserting image!");
            console.error("Error inserting image");
          }
        });
    } catch (error) {
      console.error("Error inserting image:", error);
    }
  };

  const handleValidationClick = async () => {
    // Insérer la logique ici pour traiter la validation du formulaire
    const { lng, lat } = mapCoordinates;
    insertImage(lng, lat, selectedImage, artist);
    onNextStep("/submitworkthank");
  };

  const handleMapMarkerClick = (coordinates) => {
    // Mettre à jour l'état des coordonnées lors du clic sur la carte
    setMapCoordinates({
      lng: coordinates.lng,
      lat: coordinates.lat,
      zoom: coordinates.zoom,
    });
  };

  const handleArtistChange = (e) => {
    // Mettre à jour l'état de l'artiste lors de la saisie
    setArtist(e.target.value);
  };

  return (
    <section className="SubmitW_container Global_height_smartPh Global_height">
      <div className="Picture_DesKtop_Submit">
        <img
          className="Rat_Picture_Submit_left"
          src={ratPhotographer}
          alt="ratLeft"
        />
      </div>
      <center className="title_Image_Content">
        <div className="title_Image">
          <h1 className="titleSubmitWork TSW-correctgap">propose a work</h1>
          <div className="blocImportImage2">
            <div className="importImageInside2">
              <Map
                UsingLng={mapCoordinates.lng}
                UsingLat={mapCoordinates.lat}
                UsingZoom={mapCoordinates.zoom}
                height="100%"
                width="100%"
                className="map_WCB"
                search
                mapMarker
                onMarkerClick={handleMapMarkerClick}
              />
            </div>
          </div>
          <div className="inputArtiste_SWV">
            artiste
            <label htmlFor="artiste">
              <input
                className="caseArtiste_SWV"
                type="text"
                id="artiste"
                value={artist}
                onChange={handleArtistChange}
              />
            </label>
          </div>
          <div
            className="Button-SubmitWork"
            role="button"
            onClick={handleValidationClick}
            onKeyDown={handleValidationClick}
            tabIndex="0"
          >
            <h3 className="Button-Validation">submit</h3>
          </div>
        </div>
      </center>
      <div className="Picture_DesKtop_Submit">
        <img
          className="Rat_Picture_Submit_right"
          src={ratPhotographer}
          alt="ratRight"
        />
      </div>
    </section>
  );
}

export default SubmitWorkValidation;
