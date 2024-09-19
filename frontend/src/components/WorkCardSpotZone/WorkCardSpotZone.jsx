function WorkCardSpotZone({ data }) {
  const { image } = data;
  return (
    <section className="workCardSpotZone_container">
      <div className="workCardSpotZone_content">
        <img className="Work_image_spot" src={image} alt="work" />
      </div>
    </section>
  );
}

export default WorkCardSpotZone;
