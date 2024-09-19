import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import formatDate from "../../utils/FormatDate";
import WorkCardBloc from "../WorkCardBloc/WorkCardBloc";
import "./workCard2.css";

function WorkCard2({
  data,
  admin = false,
  handleDelete,
  settingValidation = false,
  workById,
  setWorkById,
}) {
  const [selectedWork, setSelectedWork] = useState(data);
  const [open, setOpen] = useState(false);

  // Format date object:

  const formattedDate = formatDate(data?.entry);

  const openModal = () => {
    setSelectedWork(data);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedWork(null);
    setOpen(false);
  };

  return (
    <>
      <section
        role="button"
        className="workCard2_container"
        onClick={() => {
          openModal();
        }}
        onKeyDown={() => {
          openModal();
        }}
        tabIndex="0"
      >
        <div className="workCard2_content">
          <img className="Work2_image" src={data.image} alt="work" />
          <div className="work2_infos_container">
            <p className="work2_info"> {formattedDate} </p>
          </div>
        </div>
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
                data={data}
                admin={admin}
                handleDelete={handleDelete}
                closeModal={closeModal}
                settingValidation={settingValidation}
                workById={workById}
                setWorkById={setWorkById}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default WorkCard2;
