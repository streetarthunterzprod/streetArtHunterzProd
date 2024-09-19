import { useState } from "react";
import { toast } from "react-toastify";
import "./workCardBloc.css";
import WorkCard from "../WorkCard/WorkCard";
import Map from "../Map/Map";

function workCardBloc({
  data,
  admin = false,
  settingValidation = false,
  closeModal,
  handleDelete,
  handleValidate,
  workById,
  setWorkById,
}) {
  const [setting, setSetting] = useState(false);
  const [artistPseudoInput, setArtistPseudoInput] = useState("");

  // change coordonate on button //
  const [mapCoordinates, setMapCoordinates] = useState({
    lng: data.longitude,
    lat: data.latitude,
    zoom: 15,
  });

  // function Update Localisation
  const updateLocalisation = async (latitude, longitude, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/image/${id}/localisation`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Ajoutez vos headers supplémentaires si nécessaire
          },
          body: JSON.stringify({ latitude, longitude }),
          credentials: "include",
        }
      );
      console.info(id);
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la localisation");
      }

      // Si la requête réussit, vous pouvez traiter la réponse si nécessaire
      // Par exemple, vous pouvez vérifier la propriété response.status ou response.json()

      console.info("Localisation mise à jour avec succès");
    } catch (error) {
      console.error("Erreur:", error.message);
      // Gérer les erreurs ici
    }
  };

  // Function UPDATE artist
  const updateArtistInAW = async (pseudo, WorkId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/artist_work/${WorkId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Ajoutez vos headers supplémentaires si nécessaire
          },
          body: JSON.stringify({ pseudo, Work_id: WorkId }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour de l'artiste pour l'œuvre"
        );
      }
      if (response.status === 204)
        console.info("Artiste pour l'œuvre mis à jour avec succès");
      toast.success("Work is modify");
    } catch (error) {
      console.error("Erreur:", error.message);
      // Gérer les erreurs ici
    }
  };

  return (
    <section>
      <div className="workCardBloc_container">
        <div className="workCardBloc_content">
          <WorkCard
            data={data}
            settingValidation={setting || settingValidation}
            onArtistPseudoChange={setArtistPseudoInput}
            setMapCoordinates={setMapCoordinates}
          />
          <Map
            onMarkerClick={setMapCoordinates}
            UsingLng={mapCoordinates.lng}
            UsingLat={mapCoordinates.lat}
            UsingZoom={mapCoordinates.zoom}
            height="90%"
            width="39%"
            className="map_WCB"
            search
            mapMarker
            works={[data]}
          />
        </div>
        {admin && (
          <div>
            <div
              className="workCardBloc__modif_btn"
              onClick={() => setSetting(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSetting(true);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ display: setting ? "none" : "block" }}
            >
              MODIFY
            </div>
          </div>
        )}
        {setting && (
          <section className="setting_btns_WCB">
            <div
              className="valid_btn_WCB"
              onClick={async () => {
                // Appeler Update Localisation avec les coordonnées actuelles
                await updateLocalisation(
                  mapCoordinates.lat,
                  mapCoordinates.lng,
                  data.id
                );

                // Ensuite, appeler updateArtistInAW avec le pseudo de l'artiste
                await updateArtistInAW(artistPseudoInput, data.id);

                const newWork = workById.find((work) => work.id === data.id);
                newWork.latitude = mapCoordinates.lat;
                newWork.longitude = mapCoordinates.lng;
                newWork.artist_pseudo = artistPseudoInput;
                const works = workById.filter((work) => work.id !== data.id);
                setWorkById([...works, newWork]);

                // Fermer le modal après les opérations
                closeModal();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={async (event) => {
                if (event.key === "Enter") {
                  // Appeler Update Localisation avec les coordonnées actuelles
                  await updateLocalisation(
                    mapCoordinates.lat,
                    mapCoordinates.lng,
                    data.id
                  );

                  // Ensuite, appeler updateArtistInAW avec le pseudo de l'artiste
                  await updateArtistInAW(artistPseudoInput, data.id);

                  const newWork = workById.find((work) => work.id === data.id);
                  newWork.latitude = mapCoordinates.lat;
                  newWork.longitude = mapCoordinates.lng;
                  newWork.artist_pseudo = artistPseudoInput;
                  const works = workById.filter((work) => work.id !== data.id);
                  setWorkById([...works, newWork]);

                  // Fermer le modal après les opérations
                  closeModal();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 -960 960 960"
                width="35"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </div>
            <div
              className="abort_btn_WCB"
              onClick={() => setSetting(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSetting(false);
                }
              }}
              role="button"
              tabIndex={0}
            >
              BACK
            </div>
            <div
              className="trash_btn_WCB"
              onClick={async () => {
                await handleDelete(data.id);
                closeModal();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleDelete(data.id);
                  closeModal();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 -960 960 960"
                width="35"
              >
                <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
              </svg>
            </div>
          </section>
        )}
        {settingValidation && (
          <section className="setting_btns_WCB">
            <div
              className="valid_btn_WCB"
              onClick={async () => {
                // Appeler Update Localisation avec les coordonnées actuelles
                await updateLocalisation(
                  mapCoordinates.lat,
                  mapCoordinates.lng,
                  data.id
                );

                // Ensuite, appeler updateArtistInAW avec le pseudo de l'artiste
                await updateArtistInAW(artistPseudoInput, data.id);

                // Enfin, appeler handleValidate
                await handleValidate(data.id, data.user_id);

                // Fermer le modal après les opérations
                closeModal();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  // Appeler Update Localisation avec les coordonnées actuelles
                  updateLocalisation(
                    mapCoordinates.lat,
                    mapCoordinates.lng,
                    data.id
                  );

                  // Ensuite, appeler updateArtistInAW avec le pseudo de l'artiste
                  updateArtistInAW(artistPseudoInput, data.id);

                  // Enfin, appeler handleValidate
                  handleValidate(data.id, data.user_id);

                  // Fermer le modal après les opérations
                  closeModal();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 -960 960 960"
                width="35"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </div>
            <div
              className="abort_btn_WCB"
              onClick={() => setSetting(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSetting(false);
                }
              }}
              role="button"
              tabIndex={0}
            >
              BACK
            </div>
            <div
              className="trash_btn_WCB"
              onClick={async () => {
                await handleDelete(data.id);
                closeModal();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleDelete(data.id);
                  closeModal();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="35"
                viewBox="0 -960 960 960"
                width="35"
              >
                <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
              </svg>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default workCardBloc;
