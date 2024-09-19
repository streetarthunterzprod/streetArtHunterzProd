import heartIcon from "../../assets/images/img/heart1.png";
import ratPhotographer from "../../assets/images/img/Rat_photograph.png";
import "./submitWork.css";

function SubmitWorkThank({ onPreviousStep }) {
  return (
    <section className="SubmitW_container Global_height_smartPh Global_height">
      <div className="Picture_DesKtop_Submit_SWT">
        <img
          className="Rat_Picture_Submit_left"
          src={ratPhotographer}
          alt="ratLeft"
        />
      </div>
      <div className="title_Image_Content">
        <div className="title_Image_SWT">
          <h1 className="title_SWT">thanks for sharing</h1>

          <div className="heartIcon">
            <img src={heartIcon} alt="heartIcon" />
          </div>

          <p className="text_validation_SWT">
            {" "}
            It will appear after validation.
          </p>
          <div
            className="Button-SubmitWork"
            role="button"
            onClick={() => onPreviousStep()}
            onKeyDown={() => onPreviousStep()}
            tabIndex="0"
          >
            <div className="Button-Validation">back</div>
          </div>
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

export default SubmitWorkThank;
