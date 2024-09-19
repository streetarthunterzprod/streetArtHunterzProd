/* eslint-disable no-alert */
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AuthContext from "../../context/AuthContext";
import assignLevel from "../../utils/AssignLevel";
import formatDate from "../../utils/FormatDate";
import WorkCard from "../WorkCard/WorkCard";
import WorkCard2 from "../WorkCard2/WorkCard2";
import SmileyDeath from "../../assets/images/img/smiley_death.png";
import WarIsMean from "../../assets/images/img/warismean.png";
import TempVisual from "../../assets/images/img/monkey03.png";
import "./otherUserBloc.css";

function OtherUserBloc({ dataUser, handleClose, updateUserList }) {
  const { user } = useContext(AuthContext);
  const [selectUser, setSelectUser] = useState([]);
  const [userWorksData, setUserWorksData] = useState([]);
  const [userLevel, setUserLevel] = useState("");

  // DATA
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
        setUserWorksData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    if (userWorksData.length > 0) {
      const userWorks = userWorksData.filter(
        (work) => work.User_id === dataUser.id
      );
      setSelectUser(userWorks);

      const level = assignLevel(dataUser.score);
      setUserLevel(level);
    }
  }, [userWorksData, dataUser.id, dataUser.score]);

  const isAdmin = user?.admin;
  const userWorkCount = selectUser.length;

  // Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    // If user confirms deletion
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}/delete`,
          {
            method: "delete",
            credentials: "include",
          }
        );
        if (response.status === 204) {
          console.info("delete ok");
          toast.success("user is delete");
          updateUserList(id);
          handleClose();
        } else {
          console.error("error delete");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Format date object
  const formattedDate = formatDate(dataUser?.registrationDate);

  // pagination workcard smartphone
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectUser.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // pagination workcard desktop
  const [currentPageDesktop, setCurrentPageDesktop] = useState(1);
  const itemsPerPageDesktop = 6;

  const indexOfLastItemDesktop = currentPageDesktop * itemsPerPageDesktop;
  const indexOfFirstItemDesktop = indexOfLastItemDesktop - itemsPerPageDesktop;
  const currentItemsDesktop = selectUser.slice(
    indexOfFirstItemDesktop,
    indexOfLastItemDesktop
  );

  const handlePageChangeDesktop = (event, pageNumber) => {
    setCurrentPageDesktop(pageNumber);
  };

  // gestion Media Screen
  const smartphoneScreen = window.matchMedia("(max-width: 770px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  return (
    <section>
      <div className="otherUserBloc_container">
        {smartphoneScreen && (
          <div className="otherUserBloc_content">
            <div className="infos_OUB">
              <h1 className="pseudo_OUB">{dataUser.pseudo}</h1>
              <div className="Seniority_OUB">
                registered :
                <span className="font_info_color">{formattedDate} </span>
              </div>
              <div className="user_info_OUB_content">
                <p className="user_info_OUB">email: {dataUser.email} </p>
                <p className="user_info_OUB">level: {userLevel}</p>
                <p className="user_info_OUB">score: {dataUser.score} pts</p>
              </div>
            </div>
            {userWorkCount !== 0 && (
              <div className="history_OUB">
                <div className="historyWorkSubmit_OUB">
                  works submitted :{" "}
                  <span className="font_info_color"> {userWorkCount} </span>
                </div>
                <div className="workCard_area_OUB">
                  {currentItems.map((data) => (
                    <WorkCard data={data} />
                  ))}
                </div>
                <Stack spacing={0} mt={0}>
                  <Pagination
                    count={Math.ceil(userWorkCount / itemsPerPage)}
                    size="small"
                    shape="rounded"
                    variant="outlined"
                    siblingCount={0}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Stack>
              </div>
            )}
            {userWorkCount === 0 && (
              <div className="history_OUB">
                <div className="historyWorkSubmit_OUB">
                  works submitted :{" "}
                  <span className="font_info_color"> {userWorkCount} </span>
                </div>
                <div className="workCard_area_OUB">
                  <img
                    src={TempVisual}
                    alt="temp"
                    className="NoWork_visual_OUB"
                  />
                </div>
              </div>
            )}
            {isAdmin && (
              <>
                <hr className="OUB_dashed_line" />
                <div className="OUB_trash_btn_container">
                  <div
                    className="OUB_trash_btn"
                    onClick={() => handleDelete(dataUser.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleDelete(dataUser.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    DELETE USER
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {desktopScreen && (
          <div className="otherUserBloc_content">
            <div className="infos_OUB">
              <h1 className="pseudo_OUB">{dataUser.pseudo}</h1>

              <div className="user_info_OUB_content">
                <p className="user_info_OUB">email: {dataUser.email} </p>
                <p className="user_info_OUB">level: {userLevel}</p>
                <p className="user_info_OUB">score: {dataUser.score} pts</p>
              </div>

              <div className="Seniority_OUB">
                registered :
                <span className="font_info_color">{formattedDate} </span>
              </div>
              <div className="infos_bottom_OUB">
                {isAdmin ? (
                  <div className="admin_Smiley_Delete">
                    <img
                      src={SmileyDeath}
                      alt="SmileyDeath"
                      className="SmileyDeath"
                    />
                    <div className="OUB_trash_btn_container">
                      <div
                        className="OUB_trash_btn"
                        onClick={() => handleDelete(dataUser.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleDelete(dataUser.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        DELETE USER
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="WarIsMeanContainer">
                    <img
                      src={WarIsMean}
                      alt="WarIsMean"
                      className="WarIsMean"
                    />
                  </div>
                )}
              </div>
            </div>
            {userWorkCount !== 0 && (
              <div className="history_OUB">
                <div className="history_title_OUB-Desk">historical</div>

                <div className="historyWorkSubmit_OUB">
                  works submitted :
                  <span className="font_info_color"> {userWorkCount} </span>
                </div>
                <div className="workCard_area_OUB">
                  {currentItemsDesktop.map((data) => (
                    <WorkCard2 admin={isAdmin} data={data} />
                  ))}
                </div>
                <Pagination
                  count={Math.ceil(userWorkCount / itemsPerPageDesktop)}
                  size="small"
                  shape="rounded"
                  variant="outlined"
                  siblingCount={0}
                  page={currentPageDesktop}
                  onChange={handlePageChangeDesktop}
                />
              </div>
            )}
            {userWorkCount === 0 && (
              <div className="history_OUB">
                <div className="history_title_OUB-Desk">historical</div>

                <div className="historyWorkSubmit_OUB">
                  works submitted :
                  <span className="font_info_color"> {userWorkCount} </span>
                </div>
                <img
                  src={TempVisual}
                  alt="temp"
                  className="NoWork_visual_OUB"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default OtherUserBloc;
