import "./slider.css";

function Slider({ dataWorks }) {
  return (
    <div className="WorksCardSlider">
      {dataWorks.map((dataWork) => (
        <div key={dataWork.id}>
          {/* Affichez les détails de l'œuvre ici */}
          <img src={dataWork.image} alt={`Artwork ${dataWork.id}`} />
          <p>Artist: {dataWork.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default Slider;
