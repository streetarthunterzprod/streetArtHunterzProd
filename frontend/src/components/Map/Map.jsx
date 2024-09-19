/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import formatDate from "../../utils/FormatDate";
import "./map.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function StreetMap({
  height,
  width,
  UsingLng,
  UsingLat,
  UsingZoom,
  search = false,
  mapMarker = false,
  works,
  onMarkerClick,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = new mapboxgl.Marker({ color: "orange" });
  const location = useLocation();
  const markers = [];
  const smartphoneScreen = window.matchMedia("(max-width: 770px)").matches;

  const loadMarker = ({
    image,
    entry,
    longitude,
    latitude,
    user_pseudo,
    user_id,
    artist_pseudo,
    isValidate,
  }) => {
    // Format the entry date
    const formattedEntryDate = formatDate(entry);

    // Affichage conditionel artist
    const artistInfo = artist_pseudo
      ? `<p class="Map_work_info"><span class="M_W_I_span">artist</span>: ${artist_pseudo}</p>`
      : "";

    const userPseudo = user_pseudo
      ? `<p class="Map_work_info">
        <span class="M_W_I_span">submit by</span>: ${user_pseudo}
      </p>`
      : "";

    // Effectuer une requête de géocodage inversé pour obtenir le nom du lieu
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Extraire le nom du lieu à partir de la réponse
        const address = data.features[0].place_name;
        // console.info(data.features[0]);

        // Afficher les informations dans le popup
        const popup = new mapboxgl.Popup().setHTML(
          `<section className="workCard_container">
            <div className="workCard_resultcontent">
              <img width="100%" class="Work_image" src=${image} alt="work" />
              <div class="Map_work_infos_container">
                <p class="Map_work_info"><span class="M_W_I_span">entry</span>: ${formattedEntryDate}</p>
                <p class="Map_work_info"><span class="M_W_I_span">address</span>: ${address}</p>
                ${artistInfo}
                ${userPseudo}
              </div>
            </div>
          </section>`
        );

        const newmarker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(popup);
        newmarker.addTo(map.current);
        markers.push(newmarker);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  const addMarker = (event) => {
    // trigger only for right mouse click
    console.info(event);
    if (event.originalEvent?.button === 2) {
      const coordinates = event.lngLat;
      console.info("Lng:", coordinates.lng, "Lat:", coordinates.lat);
      marker.setLngLat(coordinates).addTo(map.current);
      coordinates.zoom = 15;
      onMarkerClick(coordinates);
    } else if (smartphoneScreen && event.originalEvent?.button === 0) {
      const coordinates = event.lngLat;
      console.info("Lng:", coordinates.lng, "Lat:", coordinates.lat);
      marker.setLngLat(coordinates).addTo(map.current);
      coordinates.zoom = 15;
      onMarkerClick(coordinates);
    }
  };

  useEffect(() => {
    if (map.current) {
      for (const m of markers) {
        m.remove();
      }
      if (Array.isArray(works)) {
        for (const work of works) {
          loadMarker(work);
        }
      }
      return; // initialize map only once
    }

    // initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [UsingLng, UsingLat],
      zoom: UsingZoom,
    });

    // add controls to the map (nav, fullscreen, geolocate)
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    // generate search bar
    if (search) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
        positionOptions: {
          top: "0px",
          left: "0px",
        },
        marker: { color: "orange" },
      });

      // on search bar remove previous marker and get lng/lat of the adress
      geocoder.on("result", (e) => {
        marker.remove();
        console.info(e.result.center);
      });

      // add the search bar on the map
      map.current.addControl(geocoder);
    }
    // Allow move control on the map
    map.current.on("move", () => {
      const center = map.current.getCenter();
    });

    // Add marker when click on the map
    if (mapMarker) {
      map.current.on("mousedown", addMarker);
    }

    // Add marker from data
    if (Array.isArray(works)) {
      for (const work of works) {
        loadMarker(work);
      }
    }
    // Set map center and zoom
    map.current.setCenter([UsingLng, UsingLat]);
    map.current.setZoom(UsingZoom);
  }, [works, search, mapMarker, UsingLng, UsingLat, UsingZoom, location]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([UsingLng, UsingLat]);
      map.current.setZoom(UsingZoom);
    }
  }, [UsingLng, UsingLat, UsingZoom]);

  return (
    <div
      ref={mapContainer}
      style={{ height, width }}
      className="work_map_container"
    />
  );
}

export default StreetMap;
