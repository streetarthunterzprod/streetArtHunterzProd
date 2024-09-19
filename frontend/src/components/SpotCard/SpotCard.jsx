import { useNavigate } from "react-router-dom";
import "./spotCard.css";

function SpotCard({ location }) {
  const { image } = location;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/spotzonebyid/${location.id}`);
  };
  return (
    <section>
      <div
        className="SpotCard_section"
        onClick={handleNavigate}
        onKeyDown={handleNavigate}
        tabIndex="0"
        role="button"
      >
        <div className="SpotCard_container">
          <img className="spot_image" src={image} alt="workspot" />
          <p className="spotCard_info">{location.name} </p>
        </div>
      </div>
    </section>
  );
}

export default SpotCard;
