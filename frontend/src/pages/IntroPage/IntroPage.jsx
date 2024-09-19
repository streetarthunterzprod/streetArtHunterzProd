import { useNavigate } from "react-router-dom";
import "./introPage.css";
import WallIntro from "../../assets/images/img/wall05.png";
import Crocodile from "../../assets/images/img/bomb04-2.png";
import GirlBalloon from "../../assets/images/img/little_girl_ballon.png";

function IntroPage() {
  const navigate = useNavigate();
  return (
    <section className="Intro_Page_container">
      <img
        className="wall_backgroung_intro"
        src={WallIntro}
        alt="wall_background"
      />
      <section className="intro_page_content">
        <section className="MainTile_container_intro">
          <h1 className="mainTitle_intro">STREET ART HUNTERZ</h1>
          <img className="crocodile" src={Crocodile} alt="Crocodile painter" />
        </section>
        <section className="Intro_Page_btn_content">
          <div
            className="intro_btn_smartphone"
            role="button"
            onClick={() => {
              navigate("/login");
            }}
            onKeyDown={() => {
              navigate("/login");
            }}
            tabIndex="0"
          >
            login
          </div>
          <div
            className="intro_btn_smartphone"
            role="button"
            onClick={() => {
              navigate("/register");
            }}
            onKeyDown={() => {
              navigate("/register");
            }}
            tabIndex="0"
          >
            register
          </div>
          <div className="Intro_Page_btn_deskt">
            <div
              className="intro_btn"
              role="button"
              onClick={() => {
                navigate("/login");
              }}
              onKeyDown={() => {
                navigate("/login");
              }}
              tabIndex="0"
            >
              login
            </div>
            <div
              className="intro_btn"
              role="button"
              onClick={() => {
                navigate("/register");
              }}
              onKeyDown={() => {
                navigate("/register");
              }}
              tabIndex="0"
            >
              register
            </div>
          </div>
          <div
            className="intro_btn"
            role="button"
            onClick={() => {
              navigate("/homepage");
            }}
            onKeyDown={() => {
              navigate("/homepage");
            }}
            tabIndex="0"
          >
            enter
          </div>
          <img
            className="girl_Ballon"
            src={GirlBalloon}
            alt="girl_ballon_bansky"
          />
        </section>
      </section>
    </section>
  );
}

export default IntroPage;
