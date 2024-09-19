/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./worksListAdminFeat.css";
import "./worksListAdminFeatMediaDesktop.css";
import WorkCard from "../../WorkCard/WorkCard";
import WorkCard2 from "../../WorkCard2/WorkCard2";

function WorksListAdminFeat() {
  const [worksData, setWorksData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/image`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWorksData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/image/${id}/delete`,
        {
          method: "delete",
          credentials: "include",
        }
      );
      if (response.status === 204) {
        console.info("delete ok");
        const updatedWorks = worksData.filter((work) => work.id !== id);
        setWorksData(updatedWorks);
      } else {
        console.error("error delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // unique location for Zone <option> //
  const uniqueLocations = Array.from(
    new Set(worksData.map((item) => item.location_name))
  );

  // works entry sorted //
  const workEntrySorted = worksData.slice().sort((a, b) => {
    const dateA = new Date(a.entry);
    const dateB = new Date(b.entry);

    return dateB - dateA;
  });

  // State to store selected location filter
  const [selectedLocation, setSelectedLocation] = useState("");

  // Function to handle location filter change
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Filtered works based on selected location
  const filteredWorks = selectedLocation
    ? workEntrySorted.filter((work) => work.location_name === selectedLocation)
    : workEntrySorted;

  // pagination work card //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWorks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // pagination work card for desktopScreen //
  const [currentPageDesktop, setCurrentPageDesktop] = useState(1);
  const itemsPerPageDesktop = 6;

  const indexOfLastItemDesktop = currentPageDesktop * itemsPerPageDesktop;
  const indexOfFirstItemDesktop = indexOfLastItemDesktop - itemsPerPageDesktop;
  const currentItemsDesktop = filteredWorks.slice(
    indexOfFirstItemDesktop,
    indexOfLastItemDesktop
  );

  const handlePageChangeDesktop = (event, pageNumber) => {
    setCurrentPageDesktop(pageNumber);
  };

  // Nombre total d'éléments à afficher sur chaque page
  const totalItems = filteredWorks.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalPagesDesktop = Math.ceil(totalItems / itemsPerPageDesktop);

  // gestion Media Screen //
  const smartphoneScreen = window.matchMedia("(max-width: 770px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  // >>> return <<< //
  return (
    <section className="WLAF_container">
      <div className="works_count_WLAF">
        works : <span className="font_info_color">{filteredWorks.length}</span>
      </div>
      <div className="WLAF_choice_line">
        <div
          className="WLAF_choice_btn"
          onClick={() => setSelectedLocation("")}
        >
          entry{" "}
        </div>
        <div>
          <select
            className="WLAF_location_option"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">all locations</option>
            {uniqueLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      {smartphoneScreen && (
        <div className="WLAF_workcard_container">
          {currentItems.map((data) => (
            <WorkCard key={data.id} data={data} />
          ))}
        </div>
      )}
      {/* Pagination for smartphoneScreen */}
      {smartphoneScreen && (
        <Stack spacing={0} mt={0}>
          <Pagination
            count={totalPages}
            size="small"
            shape="rounded"
            variant="outlined"
            siblingCount={0}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      )}
      {/* DELETE admin Feat for smartphoneScreen */}
      {smartphoneScreen && (
        <>
          <hr className="WLAF_dashed_line" />
          <div
            className="WLAF_trash_btn"
            onClick={() => handleDelete(worksData.id)}
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
        </>
      )}
      {desktopScreen && (
        <>
          <div className="WLAF_workcard_container">
            {currentItemsDesktop.map((data) => (
              <WorkCard2
                key={data.id}
                data={data}
                admin
                handleDelete={handleDelete}
                workById={worksData}
                setWorkById={setWorksData}
              />
            ))}
          </div>
          <Stack spacing={0} mt={0}>
            <Pagination
              count={totalPagesDesktop}
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
    </section>
  );
}

export default WorksListAdminFeat;
