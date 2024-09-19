/* eslint-disable no-alert */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./validationAdminFeat.css";
import "./validationAdminFeatMediaDesktop.css";
import WorkCard from "../../WorkCard/WorkCard";
import WorkCardBloc from "../../WorkCardBloc/WorkCardBloc";

function ValidationAdminFeat() {
  const [unvalidateWorksData, setUnvalidateWorksData] = useState([]);
  const [selectedWork, setSelectedWork] = useState();
  const [open, setOpen] = useState(false);

  // works data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/image/unvalidate`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUnvalidateWorksData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // validate function
  const handleValidate = async (id, userID) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/image/${id}/validate`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isValidate: 1,
          }),
          credentials: "include",
        }
      );
      if (response.status === 204) {
        console.info("validation ok");
        toast.success("Work is validate");

        // Increment user score by 100 points
        const userScoreResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${userID}/score`,
          {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              score: 100,
            }),
            credentials: "include",
          }
        );

        if (userScoreResponse.status === 204) {
          console.info("User score incremented by 100 points.");
        } else {
          console.error("Error incrementing user score.");
        }

        const newUnvalidate = unvalidateWorksData.filter(
          (work) => work.id !== id
        );
        setUnvalidateWorksData(newUnvalidate);
      } else {
        console.error("error validation");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete function with confirmation prompt

  const handleDelete = async (id) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this work?"
    );

    // If user confirms deletion
    if (confirmDelete) {
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
          const newUnvalidate = unvalidateWorksData.filter(
            (work) => work.id !== id
          );
          setUnvalidateWorksData(newUnvalidate);
          toast.success("rejected work deleted", {
            className: "custom-toast",
          });
        } else {
          console.error("error delete");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // new Submits Count - only the No-validate//
  const newSubmitCount = unvalidateWorksData.length;

  // pagination work card //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = unvalidateWorksData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // WideClass for width modif//
  const isWide = true;

  // gestion Media Screen //
  const smartphoneScreen = window.matchMedia("(max-width: 770px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  // gestion modal //
  const openModal = (data) => {
    setSelectedWork(data);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setOpen(false);
  };

  // >>> return <<< //
  return (
    <>
      <section className="VLAF_container">
        <div className="works_count_VLAF">
          new submits :{" "}
          <span className="font_info_color"> {newSubmitCount} </span>
        </div>
        {smartphoneScreen && (
          <>
            <div className="VLAF_workcard_container">
              {currentItems.map((data) => (
                <>
                  <WorkCard key={data.id} data={data} id="workCard_IAP" />
                  <hr className="VLAF_dashed_line" />
                  <div className="VLAF_btn_container">
                    <div
                      className="VLAF_valid_btn"
                      onClick={() => handleValidate(data.id, data.user_id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleValidate(data.id, data.user_id);
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
                      className="VLAF_trash_btn"
                      onClick={() => handleDelete(data.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleDelete(data.id);
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
                  </div>
                </>
              ))}
            </div>
            {/* Pagination */}
            {unvalidateWorksData.length > itemsPerPage && (
              <Stack spacing={0} mt={0}>
                <Pagination
                  count={Math.ceil(unvalidateWorksData.length / itemsPerPage)}
                  size="small"
                  shape="rounded"
                  variant="outlined"
                  siblingCount={0}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            )}
          </>
        )}
        {desktopScreen && (
          <section className="VLAF_workcards_Desktop">
            <div className="VLAF_workcards_container">
              <div className="VLAF_WC_DeskT_01">
                <div className="VLAF_workcard_container">
                  {currentItems.map((data) => (
                    <>
                      <WorkCard
                        key={data.id}
                        data={data}
                        id="workCard_IAP"
                        classForWCVADF={isWide}
                      />
                      <div className="VLAF_WC_DeskT_02">
                        <div className="VLAF_btn_container">
                          <div
                            className="VLAF_valid_btn"
                            onClick={() =>
                              handleValidate(data.id, data.user_id)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleValidate(data.id, data.user_id);
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
                            className="VLAF_modif_btn"
                            onClick={() => {
                              openModal(data);
                            }}
                            onKeyDown={() => {
                              openModal(data);
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
                              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                            </svg>
                          </div>
                          <div
                            className="VLAF_trash_btn"
                            onClick={() => handleDelete(data.id)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleDelete(data.id);
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
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <hr className="VLAF_solid_line" />
            {/* Pagination */}
            {unvalidateWorksData.length > itemsPerPage && (
              <Stack spacing={0} mt={0}>
                <Pagination
                  count={Math.ceil(unvalidateWorksData.length / itemsPerPage)}
                  size="small"
                  shape="rounded"
                  variant="outlined"
                  siblingCount={0}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            )}
          </section>
        )}
      </section>
      {selectedWork && (
        <Modal open={open} onClose={closeModal} className="WorkBlockModal">
          <Box>
            <Container maxWidth="lg">
              <div className="modal_closed_btn_container">
                <div
                  role="button"
                  onClick={() => {
                    closeModal();
                  }}
                  onKeyDown={() => {
                    closeModal();
                  }}
                  tabIndex="-1"
                  className="modal_closed_btn"
                >
                  X closed
                </div>
              </div>
              <WorkCardBloc
                data={selectedWork}
                closeModal={closeModal}
                settingValidation
                handleDelete={handleDelete}
                handleValidate={handleValidate}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default ValidationAdminFeat;
