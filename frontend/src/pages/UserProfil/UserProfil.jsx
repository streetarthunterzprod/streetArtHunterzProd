/* eslint-disable no-use-before-define */
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthContext from "../../context/AuthContext";
import formatDate from "../../utils/FormatDate";
import assignLevel from "../../utils/AssignLevel";
import imageMonkey from "../../assets/images/img/monkey02.png";
import UserProfilClassement from "../../components/InputUserProfil/UserProfilClassement";
import UserProfilHistorical from "../../components/InputUserProfil/UserProfilHistorical";
import "../../components/LoadingComponent/loading.css";
import "../../components/InputUserProfil/userProfil.css";

function UserProfil() {
  // database //
  const { user } = useContext(AuthContext);

  // Toggle feature //
  const [activeComponent, setActiveComponent] = useState("historicalList");
  const handleToggle = (id) => {
    setActiveComponent(id);
  };

  const [userLevel, setUserLevel] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const level = assignLevel(user.score);
        setUserLevel(level);
      }
    };
    fetchData();
  }, [user.score]);

  // Format date object:
  const formattedDate = formatDate(user?.registrationDate);

  // Function to handle the "Enter" key being
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      changePassword(event);
    }
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
        toast.success("password changed");
        handleClose(); // Fermer la modal après la modification
      } else {
        console.error("Failed to change password.", response.statusText);
      }
    } catch (error) {
      console.error("Error changing password", error);
      toast.danger("Error changing password");
    }
  };
  return (
    <section className="UP_Container Global_height">
      <div className="UP_Content">
        <div className="UP_Part1_Flex">
          <div className="UP_Title_PseudoName">{user?.pseudo}</div>
          <div className="UP_Level_Score">
            <div className="UP_Title_Level">level: {userLevel} </div>
            <div className="UP_Title_Score">score: {user?.score}</div>
          </div>
          <div className="UP_Email_Password">
            <div className="Block_Email_Password">
              <p>email: {user?.email}</p>
              <p>password: ********</p>
            </div>
            <div className="UP_Change_Password">
              <div
                className="UP_Change_Password_Inside"
                onClick={handleOpen}
                onKeyDown={handleOpen}
                role="button"
                tabIndex="0"
              >
                <p>change password</p>
              </div>
            </div>
          </div>
          <div className="UP_Register_Since">
            register since: {formattedDate}
          </div>
          <div className="UP_Image_Monkey_Center">
            <img
              className="UP_Image_Monkey"
              src={imageMonkey}
              alt="imageMonkey"
            />
          </div>
        </div>
      </div>
      <div className="UP_Content">
        <div className="UP_Part2_Flex">
          <div className="UP_Historical_Classement_Flex">
            <section className="UP_Historical_Classement">
              <div
                className={`UP_Title_Historical ${
                  activeComponent === "historicalList" ? "active" : ""
                }`}
                onClick={() => handleToggle("historicalList")}
                onKeyDown={(event) => handleToggle(event, "historicalList")}
                role="button"
                tabIndex="0"
              >
                historical
              </div>
              <div
                className={`UP_Title_Classement ${
                  activeComponent === "classementList" ? "active" : ""
                }`}
                onClick={() => handleToggle("classementList")}
                onKeyDown={(event) => handleToggle(event, "classementList")}
                role="button"
                tabIndex="0"
              >
                classement
              </div>
            </section>
            {activeComponent === "historicalList" && <UserProfilHistorical />}
            {activeComponent === "classementList" && <UserProfilClassement />}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className="password_change_container_UP">
            <h1 className="password_change_title">CHANGE YOUR PASSWORD</h1>
            <input
              type="password"
              className="password_change_placeholder_UP"
              placeholder="enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div
              className="password_change_validbtn_UP"
              onClick={changePassword}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex="0"
            >
              VALIDATION
            </div>
          </section>
        </Box>
      </Modal>
    </section>
  );
}

export default UserProfil;
