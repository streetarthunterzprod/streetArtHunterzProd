import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AuthContext from "../../context/AuthContext";
import Map from "../../components/Map/Map";
import WorkCard2 from "../../components/WorkCard2/WorkCard2";
import "./spotZoneById.css";

function SpotZoneById() {
  const { location } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);
  const [mapCoordinates, setMapCoordinates] = useState({
    lng: 2.3522,
    lat: 48.8566,
    zoom: 11,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/location/${location}`,
          {
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          const locationData = data.location;
          const lng = locationData[0]?.lng;
          const lat = locationData[0]?.lat;
          setWorks(locationData);
          setMapCoordinates({ lat, lng, zoom: 13 });
        }
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchData();
  }, []);

  // Logique pagination smartphone
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = works?.slice(indexOfFirstItem, indexOfLastItem);

  // Logique pagination Desktop

  const [currentPageDesktop, setCurrentPageDesktop] = useState(1);
  const itemsPerPageDesktop = 6;
  const countDesktopPages = Math.ceil(
    (works?.length ?? 0) / itemsPerPageDesktop
  );
  const handlePageChangeDesktop = (event, pageNumberDesktop) => {
    setCurrentPageDesktop(pageNumberDesktop);
  };

  const indexOfLastItemDesktop = currentPageDesktop * itemsPerPageDesktop;
  const indexOfFirstItemDesktop = indexOfLastItemDesktop - itemsPerPageDesktop;
  const currentItemsDesktop = works?.slice(
    indexOfFirstItemDesktop,
    indexOfLastItemDesktop
  );
  // Gestion Media Screen //

  const smartphoneScreen = window.matchMedia("(min-width: 320px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  // return //
  return (
    <section className="spotZoneById Global_height">
      {smartphoneScreen && (
        <div className="Global_container_Smartphone">
          <div className="smartphone_content">
            <h1 className="Title_SpotZoneById">{works && works[0]?.name}</h1>
            <div className="text_SpotZoneByid">
              <p>{works && works[0]?.description}</p>
            </div>
            <hr className="dashed_line_SpotZone" />
            <div className="Pagination_SpotZone_Smartphone">
              <Stack spacing={0} mt={0}>
                <Pagination
                  count={works?.length}
                  size="small"
                  shape="rounded"
                  variant="outlined"
                  siblingCount={0}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
            <div className="works_city_zone_container_Smartphone">
              <div className="content_Work_City_Zone">
                {currentItems.map((data) => (
                  <WorkCard2 key={data.id} data={data} />
                ))}
              </div>
            </div>

            <div className="picture_map_container">
              <Map
                UsingLng={mapCoordinates?.lng}
                UsingLat={mapCoordinates?.lat}
                UsingZoom={mapCoordinates?.zoom}
                height="300px"
                width="auto"
                works={works}
                className="map_WCB"
              />
            </div>
            <div
              className="Button-Back-Spotzone"
              role="button"
              onClick={() => {
                navigate("/spotzone");
              }}
              onKeyDown={() => {
                navigate("/spotzone");
              }}
              tabIndex="0"
            >
              BACK
            </div>
          </div>
        </div>
      )}

      {desktopScreen && (
        <div className="spotZoneById">
          <div className="spotZoneIDContent">
            <div className="city_zone_container">
              <h1 className="Title_SpotZoneById">{works && works[0]?.name}</h1>
              <div className="picture_map_container">
                <Map
                  UsingLng={mapCoordinates?.lng}
                  UsingLat={mapCoordinates?.lat}
                  UsingZoom={mapCoordinates?.zoom}
                  height="300px"
                  width="auto"
                  works={works}
                  className="map_WCB"
                />
              </div>
              <div className="text_SpotZoneByid">
                <p>{works[0]?.description}</p>
              </div>
              <div
                className="Button-Back-Spotzone"
                role="button"
                onClick={() => {
                  navigate("/spotzone");
                }}
                onKeyDown={() => {
                  navigate("/spotzone");
                }}
                tabIndex="0"
              >
                BACK
              </div>
            </div>

            <div className="Global_container_desktop">
              <div className="works_city_zone_container_Desktop">
                <div className="content_Work_City_Zone">
                  {currentItemsDesktop.map((data) => (
                    <WorkCard2
                      className="Workcard_SpotZone_Desktop"
                      key={data.id}
                      data={data}
                      admin={user}
                    />
                  ))}
                </div>
              </div>
              <Stack spacing={0} mt={0}>
                <Pagination
                  className="Pagination_SpotZone_Desktop"
                  count={countDesktopPages}
                  size="small"
                  shape="rounded"
                  variant="outlined"
                  siblingCount={0}
                  page={currentPageDesktop}
                  onChange={handlePageChangeDesktop}
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SpotZoneById;
