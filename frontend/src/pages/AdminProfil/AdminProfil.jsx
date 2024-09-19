import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./adminProfil.css";
import "./adminProfilMediaDeskTop.css";
import formatDate from "../../utils/FormatDate";
import AuthContext from "../../context/AuthContext";
import UserListAdminFeat from "../../components/AdminFeatures/UserListAdminFeat/UserListAdminFeat";
import WorksListAdminFeat from "../../components/AdminFeatures/WorksListAdminFeat/WorksListAdminFeat";
import ValidationAdminFeat from "../../components/AdminFeatures/ValidationAdminFeat/ValidationAdminFeat";
import WorkCard from "../../components/WorkCard/WorkCard";
import WorkCard2 from "../../components/WorkCard2/WorkCard2";
import MonkeyEmpty from "../../assets/images/img/monkey03.png";

function AdminProfil() {
  const { user } = useContext(AuthContext);
  const [workById, setWorkById] = useState([]);
  const [worksData, setWorkData] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  // works data
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
        setWorkById(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // simulation de données perso de la l'admin //
  const adminHistoryWork = workById.filter((work) => work.User_id === user?.id);
  const adminWorksCount = adminHistoryWork.length;

  // Format date object:
  const formattedDate = formatDate(user?.registrationDate);

  // Toggle Admin Profil Info //
  const [adminInfoIsOpen, setAdminInfoIsOpen] = useState(false);

  const toggleAdminInfo = () => {
    setAdminInfoIsOpen(!adminInfoIsOpen);
  };
  // gestion modal password
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Toggle historical Info //
  const [adminHistoricalIsOpen, setAdminHistoricalIsOpen] = useState(false);

  const toggleAdminHistorical = () => {
    setAdminHistoricalIsOpen(!adminHistoricalIsOpen);
  };

  // pagination historical //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adminHistoryWork.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // pagination work card for desktopScreen //
  const [currentPageDesktop, setCurrentPageDesktop] = useState(1);
  const itemsPerPageDesktop = 3;

  const indexOfLastItemDesktop = currentPageDesktop * itemsPerPageDesktop;
  const indexOfFirstItemDesktop = indexOfLastItemDesktop - itemsPerPageDesktop;
  const currentItemsDesktop = adminHistoryWork.slice(
    indexOfFirstItemDesktop,
    indexOfLastItemDesktop
  );

  const handlePageChangeDesktop = (event, pageNumber) => {
    setCurrentPageDesktop(pageNumber);
  };

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
        setWorkData(updatedWorks);
      } else {
        console.error("error delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // change password //
  const changePassword = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/changePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword,
          }),
          credentials: "include",
        }
      );

      if (response.status === 204) {
        console.info("Password changed successfully.");
        handleClose(); // Fermer la modal après la modification
      } else {
        console.error("Failed to change password.", response.statusText);
      }
    } catch (error) {
      console.error("Error changing password", error);
    }
  };

  // Toggle Admin feature //
  const [activeComponent, setActiveComponent] = useState("workValidation");

  const handleToggle = (id) => {
    setActiveComponent(id);
  };
  // gestion Media Screen //
  const smartphoneScreen = window.matchMedia("(max-width: 770px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  // >>> return <<< //
  return (
    <section className="AdminProfilContainer Global_height">
      <div className="AdminProfil_content">
        {/* SECTION profil info */}
        <section className="admin_infos_bloc">
          <h1 className="Pseudo_admin">{user?.pseudo}</h1>
          <div className="Seniority_admin_container">
            <p className="Seniority_admin"> admin since {formattedDate}</p>
          </div>
          {/* CONTENT profil infos smartphone */}
          {smartphoneScreen && (
            <div className="ProfilInfos_container_admin">
              <div className="admin_title_box">
                <h2 className="ProfilInfos_title_admin">profil infos</h2>
                {!adminInfoIsOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35"
                    viewBox="0 -960 960 960"
                    width="35"
                    className="arrow_toggle_admin"
                    id="btn_Profil_Info_admin_open"
                    onClick={toggleAdminInfo}
                  >
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35"
                    viewBox="0 -960 960 960"
                    width="35"
                    className="arrow_toggle_admin"
                    id="btn_Profil_Info_admin_closed"
                    onClick={toggleAdminInfo}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                )}
              </div>
              {adminInfoIsOpen && (
                <div className="Profil_infos_content_admin">
                  <p className="admin_infos">email: {user?.email}</p>
                  <p className="admin_infos">password: ******</p>
                  <div
                    className="admin_infos_btn"
                    onClick={handleOpen}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleOpen();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <p className="text_admin_infos_btn">change password</p>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* CONTENT profil infos desktop */}
          {desktopScreen && (
            <div className="ProfilInfos_container_admin">
              <div className="Profil_infos_content_admin">
                <div className="admin_infos_container">
                  <p className="admin_infos">
                    email:{" "}
                    <span className="admin_infos_desk_font">{user?.email}</span>
                  </p>
                  <p className="admin_infos">
                    password:{" "}
                    <span className="admin_infos_desk_font">******</span>
                  </p>
                </div>
                <div
                  className="admin_infos_btn"
                  onClick={handleOpen}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleOpen();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <p className="text_admin_infos_btn">change password</p>
                </div>
              </div>
            </div>
          )}
          {/* CONTENT historical smartphone */}
          {smartphoneScreen && (
            <div className="history_container_admin">
              <div className="admin_history_title_box">
                <h2 className="history_title_admin">historical</h2>
                {!adminHistoricalIsOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35"
                    viewBox="0 -960 960 960"
                    width="35"
                    className="arrow_toggle_admin"
                    id="btn_Profil_Info_admin_open"
                    onClick={toggleAdminHistorical}
                  >
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="35"
                    viewBox="0 -960 960 960"
                    width="35"
                    className="arrow_toggle_admin"
                    id="btn_Profil_Info_admin_closed"
                    onClick={toggleAdminHistorical}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                )}
              </div>
              {adminHistoricalIsOpen && (
                <>
                  <div className="historyWorkSubmit_admin">
                    works submitted :
                    <span className="font_info_color"> {adminWorksCount}</span>
                  </div>
                  <div className="admin_workcard_container">
                    {currentItems.map((dataAd) => (
                      <>
                        <WorkCard key={dataAd.id} data={dataAd} />

                        <div
                          className="admin_trash_btn"
                          onClick={() => {
                            handleDelete(dataAd.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleDelete(dataAd.id);
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
                        <hr className="dashed_line_admin" />
                      </>
                    ))}
                  </div>
                  <div className="pagination_adminProfil_smartP">
                    <Stack spacing={0} mt={0}>
                      <Pagination
                        count={Math.ceil(
                          adminHistoryWork.length / itemsPerPage
                        )}
                        size="small"
                        shape="rounded"
                        variant="outlined"
                        siblingCount={0}
                        page={currentPage}
                        onChange={handlePageChange}
                      />
                    </Stack>
                  </div>
                </>
              )}
            </div>
          )}
          {/* CONTENT historical desktop */}
          {desktopScreen && (
            <div className="history_container_admin">
              <div className="admin_history_title_box">
                <h2 className="history_title_admin">historical</h2>
              </div>
              <div className="history_admin_content">
                <div className="history_admin_content">
                  {adminWorksCount === 0 ? (
                    <div className="empty_history_admin_container">
                      <div className="historyWorkSubmit_admin_EMPTY">EMPTY</div>
                      <img
                        src={MonkeyEmpty}
                        className="MonkeyEmpy"
                        alt="Monkey Empty"
                      />
                    </div>
                  ) : (
                    <div className="historyWorkSubmit_admin">
                      works submitted :
                      <span className="font_info_color">
                        {" "}
                        {adminWorksCount}
                      </span>
                    </div>
                  )}
                </div>
                <div className="admin_workcard_container">
                  {currentItemsDesktop.map((dataAd) => (
                    <WorkCard2
                      key={dataAd.id}
                      data={dataAd}
                      admin
                      handleDelete={handleDelete}
                      workById={workById}
                      setWorkById={setWorkById}
                    />
                  ))}
                </div>
              </div>
              {/* Pagination */}
              {adminWorksCount !== 0 && (
                <Stack spacing={0} mt={0}>
                  <Pagination
                    count={Math.ceil(
                      adminHistoryWork.length / itemsPerPageDesktop
                    )}
                    size="small"
                    shape="rounded"
                    variant="outlined"
                    siblingCount={0}
                    page={currentPageDesktop}
                    onChange={handlePageChangeDesktop}
                  />
                </Stack>
              )}
            </div>
          )}
        </section>
        {/* SECTION admin features */}
        <section className="admin_features">
          {/* toggle features */}
          <div className="Line_BtnToggle_adminFeat">
            <div
              className={`BtnToggle_adminFeat ${
                activeComponent === "usersList" ? "active" : ""
              }`}
              onClick={() => handleToggle("usersList")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggle("usersList");
                }
              }}
              role="button"
              tabIndex={0}
              id="usersList_admin"
            >
              users list
            </div>
            <div
              className={`BtnToggle_adminFeat ${
                activeComponent === "worksList" ? "active" : ""
              }`}
              id="worksList_admin"
              onClick={() => handleToggle("worksList")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggle("worksList");
                }
              }}
              role="button"
              tabIndex={0}
            >
              works list
            </div>
            <div
              className={`BtnToggle_adminFeat ${
                activeComponent === "workValidation" ? "active" : ""
              }`}
              id="workValidation_admin"
              onClick={() => handleToggle("workValidation")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggle("workValidation");
                }
              }}
              role="button"
              tabIndex={0}
            >
              validation
            </div>
          </div>
          {/* admin features COMPONENTS */}
          {activeComponent === "usersList" && <UserListAdminFeat data={user} />}
          {activeComponent === "worksList" && <WorksListAdminFeat />}
          {activeComponent === "workValidation" && <ValidationAdminFeat />}
        </section>
      </div>
      {/* MODAL change Password */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className="password_change_container">
            <h1 className="password_change_title">CHANGE YOUR PASSWORD</h1>
            <input
              type="password"
              className="password_change_placeholder"
              placeholder="enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div
              className="password_change_validbtn"
              onClick={changePassword}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  changePassword();
                }
              }}
              role="button"
              tabIndex={0}
            >
              VALIDATION
            </div>
          </section>
        </Box>
      </Modal>
    </section>
  );
}
export default AdminProfil;
