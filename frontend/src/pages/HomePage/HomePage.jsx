import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLoaderData } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import KidCompass from "../../assets/images/img/Anonym_boussole.png";
import StreetMap from "../../components/Map/Map";
import "./homePage.css";

function HomePage() {
  // database //
  const works = useLoaderData();

  // Mui button style //
  const theme = createTheme({
    palette: {
      primary: {
        main: "#141414",
      },
    },
    typography: {
      button: {
        fontFamily: "Black Ops One",
      },
    },
  });

  // change coordonate on cardinal button //
  const [mapCoordinates, setMapCoordinates] = useState({
    lng: 2.3522,
    lat: 48.8566,
    zoom: 11,
  });

  const handleButtonClick = (direction) => {
    let newLng = mapCoordinates.lng;
    let newLat = mapCoordinates.lat;
    let newZoom = mapCoordinates.zoom;

    switch (direction) {
      case "NORTH":
        newLng = 2.3594563;
        newLat = 48.8977035;
        newZoom = 12;
        break;
      case "SOUTH":
        newLng = 2.32536056;
        newLat = 48.8232512;
        newZoom = 12;
        break;
      case "EAST":
        newLng = 2.407183;
        newLat = 48.8646027;
        newZoom = 12;
        break;
      case "WEST":
        newLng = 2.2672845;
        newLat = 48.8496861;
        newZoom = 13;
        break;
      default:
        break;
    }

    setMapCoordinates({ lng: newLng, lat: newLat, zoom: newZoom });
  };

  // gestion Media Screen //
  const smartphoneScreen = window.matchMedia("(max-width: 1439px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  // >>> return <<< //
  return (
    <section className="homepage_Container Global_height">
      <div className="kidCompass_container">
        <img
          src={KidCompass}
          alt="kid compass"
          className="KidCompass KidCompass_right"
        />
      </div>
      <section className="Homepage_central">
        <div className="homepage_intro_content">
          <h1 className="intro_title_homePage">the urban art cartographers</h1>
          <p className="intro_text_homePage">
            Explore the walls of your city {smartphoneScreen && <br />} and
            share what you see.
          </p>
        </div>
        <div className="map_homePage_container">
          <StreetMap
            height={500}
            width="100%"
            search
            UsingLng={mapCoordinates.lng}
            UsingLat={mapCoordinates.lat}
            UsingZoom={mapCoordinates.zoom}
            works={works}
          />
        </div>
        <div className="cardinal_buttons_line">
          {smartphoneScreen && (
            <ThemeProvider theme={theme}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleButtonClick("NORTH")}
                >
                  NORTH
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleButtonClick("SOUTH")}
                >
                  SOUTH
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleButtonClick("EAST")}
                >
                  EAST
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleButtonClick("WEST")}
                >
                  WEST
                </Button>
              </Stack>
            </ThemeProvider>
          )}
          {desktopScreen && (
            <ThemeProvider theme={theme}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => handleButtonClick("NORTH")}
                >
                  NORTH
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => handleButtonClick("SOUTH")}
                >
                  SOUTH
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => handleButtonClick("EAST")}
                >
                  EAST
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => handleButtonClick("WEST")}
                >
                  WEST
                </Button>
              </Stack>
            </ThemeProvider>
          )}
        </div>
      </section>
      <div className="kidCompass_container">
        <img src={KidCompass} alt="kid compass" className="KidCompass" />
      </div>
    </section>
  );
}

export default HomePage;
