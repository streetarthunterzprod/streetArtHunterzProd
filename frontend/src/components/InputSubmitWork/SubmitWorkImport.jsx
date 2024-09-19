import React, { useState, useRef } from "react";
import ratPhotographer from "../../assets/images/img/Rat_photograph.png";
import "./submitWork.css";

function SubmitWorkImport({ onNextStep, onImageSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    console.info(fileInputRef.current.files, e.target.files);
    const image = e.target.files[0];
    const imagePath = URL.createObjectURL(image);
    setSelectedImage(imagePath);
    // Utiliser la fonction onImageSelect pour partager le chemin de l'image
    onImageSelect(image);
  };

  const resetImage = () => {
    setSelectedImage(null);
    // Réinitialise le champ de fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  console.info(resetImage);

  const handleClickReimport = () => {
    // Déclenche manuellement l'événement onChange du champ de fichier
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="SubmitW_container Global_height_smartPh Global_height">
      <div className="Picture_DesKtop_Submit">
        <img
          className="Rat_Picture_Submit_left"
          src={ratPhotographer}
          alt="ratLeft"
        />
      </div>
      <div className="title_Image_Content">
        <div className="title_Image">
          <div className="titleSubmitWork TSW-correctgap">propose a work</div>
          <div className="blocImportImage">
            <div className="importImageInside">
              <label htmlFor="fileInput">
                {/* Afficher l'image SVG seulement si aucune image n'est sélectionnée */}
                {!selectedImage && (
                  <svg
                    className="importImagePhoto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="82.07px"
                    viewBox="0 -960 960 960"
                    width="82.07px"
                  >
                    <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
                  </svg>
                )}

                {/* Afficher le texte uniquement si une image est sélectionnée */}
                {!selectedImage ? (
                  <h2 className="titleImportImage_SWI">import an image</h2>
                ) : null}

                {/* Afficher l'image sélectionnée si une image est sélectionnée */}
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Work"
                    className="Style-Image-Inside"
                  />
                )}
              </label>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div
            className="Button-SubmitWork"
            role="button"
            onClick={() => onNextStep("/submitworkvalidation")}
            onKeyDown={() => onNextStep("/submitworkvalidation")}
            tabIndex="0"
          >
            <h3 className="Button-Validation">validation</h3>
          </div>
          {selectedImage && (
            <div
              className="Button-Reset"
              role="button"
              tabIndex="0"
              onClick={handleClickReimport}
              onKeyDown={handleClickReimport}
            >
              Reset
            </div>
          )}
        </div>
      </div>

      <div className="Picture_DesKtop_Submit">
        <img
          className="Rat_Picture_Submit_right"
          src={ratPhotographer}
          alt="ratRight"
        />
      </div>
    </section>
  );
}

export default SubmitWorkImport;
