import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SpotCard from "../../components/SpotCard/SpotCard";
import PictureBottom from "../../assets/images/img/graph04 (1).png";
import "./spotZone.css";

function SpotZone() {
  // database //
  const locations = useLoaderData() || [];

  // Logique pagination smartphone
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);

  // Logique pagination Desktop

  const [currentPageDesktop, setCurrentPageDesktop] = useState(1);
  const itemsPerPageDesktop = 4;
  const handlePageChangeDesktop = (event, pageNumberDesktop) => {
    setCurrentPageDesktop(pageNumberDesktop);
  };

  const indexOfLastItemDesktop = currentPageDesktop * itemsPerPageDesktop;
  const indexOfFirstItemDesktop = indexOfLastItemDesktop - itemsPerPageDesktop;
  const currentItemsDesktop = locations.slice(
    indexOfFirstItemDesktop,
    indexOfLastItemDesktop
  );

  // gestion Media Screen //
  const smartphoneScreen = window.matchMedia("(min-width: 320px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  return (
    <section className="spotZoneContainer Global_height">
      <h1 className="title_SpotZone">STREET ART SPOTS</h1>
      <div className="text_SpotZone">
        <p>
          Dive into the heart of street art's creative buzz with our exciting
          street art strolls. Let us guide you through the most dynamic
          neighborhoods of the city, where walls become canvases and alleyways
          become open-air galleries.
        </p>
      </div>

      {smartphoneScreen && (
        <>
          <hr className="dashed_line_SpotZone" />
          <div className="Pagination_SpotZone_Smartphone">
            <Stack spacing={0} mt={0}>
              <Pagination
                count={Math.ceil(locations.length / itemsPerPage)}
                size="small"
                shape="rounded"
                variant="outlined"
                siblingCount={0}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
          <div className="spotZone_workcard_container">
            {currentItems.map((location) => (
              <SpotCard
                className="SpotCard_content"
                key={location.id}
                location={location}
              />
            ))}
          </div>
        </>
      )}
      {desktopScreen && (
        <>
          <div className="spotZone_workcard_container_desktop">
            {currentItemsDesktop.map((location) => (
              <SpotCard key={location.id} location={location} />
            ))}
          </div>
          <Stack spacing={0} mt={0}>
            <Pagination
              count={Math.ceil(locations.length / itemsPerPageDesktop)}
              size="small"
              shape="rounded"
              variant="outlined"
              siblingCount={0}
              page={currentPageDesktop}
              onChange={handlePageChangeDesktop}
            />
          </Stack>
        </>
      )}
      <section className="containeer_picture_bottom_spotzone">
        <img
          className="picture_bottom_SpotZone"
          src={PictureBottom}
          alt="pictureBottomLefty"
        />

        <img
          className="picture_bottom_SpotZone pbSpotZone_Inverse"
          src={PictureBottom}
          alt="pictureBottomRight"
        />
      </section>
    </section>
  );
}

export default SpotZone;
