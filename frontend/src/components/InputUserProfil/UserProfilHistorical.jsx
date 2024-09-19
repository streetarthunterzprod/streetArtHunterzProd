import { useState, useContext, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import WorkCard from "../WorkCard/WorkCard";
import WorkCard2 from "../WorkCard2/WorkCard2";
import AuthContext from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Monkey from "../../assets/images/img/monkey03.png";

function UserProfilHistorical() {
  // database //
  const [works, setWorks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/image`,
        {
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setWorks(data);
      }
    };
    fetchData();
  }, [user.score]);

  // Works Count - only the validate //
  const UsersWorks = works.filter((work) => work.User_id === user?.id);

  // pagination work card //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = UsersWorks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // pagination work card for desktopScreen //
  const [currentPageDesktop, setCurrentPageDesktop] = useState(1);
  const itemsPerPageDesktop = 6;

  const indexOfLastItemDesktop = currentPageDesktop * itemsPerPageDesktop;
  const indexOfFirstItemDesktop = indexOfLastItemDesktop - itemsPerPageDesktop;
  const currentItemsDesktop = UsersWorks.slice(
    indexOfFirstItemDesktop,
    indexOfLastItemDesktop
  );

  const handlePageChangeDesktop = (event, pageNumber) => {
    setCurrentPageDesktop(pageNumber);
  };
  console.info(currentItemsDesktop);
  // gestion Media Screen //
  const smartphoneScreen = window.matchMedia("(max-width: 770px)").matches;
  const desktopScreen = window.matchMedia("(min-width: 1440px)").matches;

  return (
    <section>
      <div className="UPH_Work_Submited">
        <div className="UPH_Works_Count">
          works submitted:{" "}
          <span className="font_info_color">{UsersWorks.length}</span>
        </div>

        {smartphoneScreen && UsersWorks.length === 0 && (
          <div className="UPH_Workcard_Container">
            <div className="monkeyNoWork_Position">
              <img
                src={Monkey}
                alt="monkey keep it real"
                className="monkey_no_work_UPH"
              />
            </div>
          </div>
        )}

        {smartphoneScreen && (
          <div className="UPH_Workcard_Container">
            {currentItems.map((data) => (
              <WorkCard key={data.id} data={data} />
            ))}
            <Stack spacing={0} mt={0}>
              <Pagination
                count={Math.ceil(UsersWorks.length / itemsPerPage)}
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

        {desktopScreen && UsersWorks.length === 0 && (
          <div className="UPH_Workcard_Container">
            <div className="monkeyNoWork_Position">
              <img
                src={Monkey}
                alt="monkey keep it real"
                className="monkey_no_work_UPH"
              />
            </div>
          </div>
        )}

        {desktopScreen && (
          <>
            <div className="UPH_Workcard_Container">
              {currentItemsDesktop.map((data) => (
                <WorkCard2 key={data.id} data={data} />
              ))}
            </div>
            <Stack spacing={0} mt={0}>
              <Pagination
                count={Math.ceil(UsersWorks.length / itemsPerPageDesktop)}
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
      </div>
    </section>
  );
}

export default UserProfilHistorical;
