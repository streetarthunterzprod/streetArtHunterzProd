import { useState, useContext, useEffect } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import AuthContext from "../../context/AuthContext";
import formatDate from "../../utils/FormatDate";
import OtherUserBloc from "../OtherUserBloc/OtherUserBloc";
import SmileySearch from "../../assets/images/ico/smilley.png";
import "react-toastify/dist/ReactToastify.css";
import "./userProfil.css";

function UserProfilClassement() {
  // database //
  const { user } = useContext(AuthContext);

  const [userClass, setUserClass] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();

        data.sort((a, b) => b.score - a.score);
        setUserClass(data);
      }
    };
    fetchData();
  }, [user.score]);

  // search bar //
  const [search, setSearch] = useState("");

  const handleTyping = (e) => {
    let { value } = e.target;
    value = value.replace(/-/g, "").toLowerCase();
    setSearch(value);
  };

  const filteredUsers = userClass.filter((dataItem) =>
    dataItem.pseudo
      .toString()
      .toLowerCase()
      .replace(/-/g, "")
      .includes(search.toLowerCase())
  );

  // state pagination user list //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userClass.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalFilteredUsersPages = Math.ceil(
    filteredUsers.length / itemsPerPage
  );

  // User props Modal //
  const [selectedUser, setSelectedUser] = useState(null);

  // state modal //
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (userData) => {
    setSelectedUser(userData);
    setOpen(true);
  };

  return (
    <section>
      <div className="UPC_Work_Submited_Classement">
        <div className="searchBar_UPC_container">
          <input
            type="text"
            value={search}
            onChange={handleTyping}
            placeholder="Who are we looking for ?"
            className="searchBar_UPC"
          />
          <img
            src={SmileySearch}
            alt="Smiley Search"
            className="Smiley_Search_UPC"
          />
        </div>
        <div className="UPC_Users_List_Td_container">
          <section className="UPC_Users_List_Table_container">
            {search === "" && (
              <table className="UPC_Users_List_Table">
                {currentItems.map((users, index) => (
                  <tr
                    onClick={() => handleOpen(users)}
                    className="UPC_UsersList_Tr"
                    key={users.id}
                  >
                    <td className="UPC_Users_List_Td">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="UPC_Users_List_Td">{users.pseudo}</td>
                    <td className="UPC_Users_List_Td">{users.score}</td>
                    <td className="UPC_Users_List_Td">
                      {formatDate(users.registrationDate)}
                    </td>
                  </tr>
                ))}
              </table>
            )}
            {search !== "" && (
              <table className="UPC_Users_List_Table">
                {filteredUsers.map((users, index) => (
                  <tr
                    className="UPC_UsersList_Tr"
                    onClick={() => handleOpen(users)}
                    key={users.id}
                  >
                    <td className="UPC_Users_List_Td">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="UPC_Users_List_Td">{users.pseudo}</td>
                    <td className="UPC_Users_List_Td">{users.score}</td>
                    <td className="UPC_Users_List_Td">
                      {formatDate(users.registrationDate)}
                    </td>
                  </tr>
                ))}
              </table>
            )}
          </section>
        </div>
        {/* Pagination table */}
        <Stack spacing={2} mt={2}>
          <Pagination
            count={totalFilteredUsersPages}
            size="small"
            shape="rounded"
            variant="outlined"
            siblingCount={0}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "auto",
            width: "100%",
            maxHeight: "80%",
          }}
        >
          <Container maxWidth="lg">
            <div className="modal_closed_btn_container">
              <button
                onClick={handleClose}
                className="modal_closed_btn"
                type="button"
              >
                X closed
              </button>
            </div>
            <OtherUserBloc dataUser={selectedUser} className="OtherUserModal" />
          </Container>
        </Box>
      </Modal>
    </section>
  );
}

export default UserProfilClassement;
