import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/material";
import "./classement.css";
import formatDate from "../../utils/FormatDate";
import OtherUserBloc from "../../components/OtherUserBloc/OtherUserBloc";
import MostWanted from "../../assets/images/img/Most_Wanted.png";
import SmileySearch from "../../assets/images/img/smilley.png";
import AnonymousKing from "../../assets/images/img/anonymous_king.png";
import Crown from "../../assets/images/img/crown.png";

function Classement() {
  // data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedUsers = data.sort((a, b) => b.score - a.score);
        setUsers(sortedUsers);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // search bar //
  const [search, setSearch] = useState("");

  const handleTyping = (e) => {
    let { value } = e.target;
    value = value.replace(/-/g, "").toLowerCase();
    setSearch(value);
  };

  const filteredUsers = users.filter((dataItem) =>
    dataItem.pseudo
      .toString()
      .toLowerCase()
      .replace(/-/g, "")
      .includes(search.toLowerCase())
  );

  // state pagination table //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
  const handleOpen = (userData) => {
    setSelectedUser(userData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <section className="Classement_section Global_height">
      <div className="Classement_content">
        <div className="AnonymousKing_Classement">
          <img
            src={AnonymousKing}
            alt="Anonymous King"
            className="AnonymousKing AnonymousKing_right"
          />
        </div>

        <div className="Classement_bloc">
          <img src={Crown} alt="Crown" className="Crown" />
          <h1 className="Classement_Title">hunterz Classement</h1>

          <img src={MostWanted} alt="Most Wanted" className="Most_Wanted" />

          <section className="Users_List_Classement">
            <div className="searchBar_Classement_container">
              <input
                type="text"
                value={search}
                onChange={handleTyping}
                placeholder="Who are we looking for ?"
                className="searchBar_Classement"
              />
              <img
                src={SmileySearch}
                alt="Smiley Search"
                className="Smiley_Search_Classement"
              />
            </div>

            {search === "" && (
              <table className="UsersList_Table_Classement">
                {currentItems.map((user, index) => (
                  <tr
                    onClick={() => handleOpen(user)}
                    className="UsersList_Tr_Classement"
                    key={user.id}
                  >
                    <td className="UsersList_Td_Classement">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="UsersList_Td_Classement">{user.pseudo}</td>
                    <td className="UsersList_Td_Classement">{user.score}</td>
                    <td className="UsersList_Td_Classement">
                      {formatDate(user.registrationDate)}
                    </td>
                  </tr>
                ))}
              </table>
            )}
            {search !== "" && (
              <table className="UsersList_Table_Classement">
                {filteredUsers.map((user, index) => (
                  <tr
                    onClick={() => handleOpen(user)}
                    className="UsersList_Tr_Classement"
                    key={user.id}
                  >
                    <td className="UsersList_Td_Classement">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="UsersList_Td_Classement">{user.pseudo}</td>
                    <td className="UsersList_Td_Classement">{user.score}</td>
                    <td className="UsersList_Td_Classement">
                      {formatDate(user.registrationDate)}
                    </td>
                  </tr>
                ))}
              </table>
            )}
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
          </section>

          <Modal open={open} onClose={handleClose}>
            <Box>
              <Container maxWidth="lg">
                <div className="modal_closed_btn_container">
                  <div
                    onClick={handleClose}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleClose();
                      }
                    }}
                    className="modal_closed_btn"
                    role="button"
                    tabIndex={0}
                  >
                    X closed
                  </div>
                </div>
                {selectedUser && (
                  <OtherUserBloc
                    dataUser={selectedUser}
                    className="OtherUserModal"
                  />
                )}
              </Container>
            </Box>
          </Modal>
        </div>
        <div className="AnonymousKing_Classement">
          <img
            src={AnonymousKing}
            alt="Anonymous King"
            className="AnonymousKing"
          />
        </div>
      </div>
    </section>
  );
}

export default Classement;
