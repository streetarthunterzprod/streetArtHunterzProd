const assignLevel = (score) => {
  if (score < 100) return "Curious Stroller";
  if (score >= 100 && score < 200) return "Beginner of Alleys";
  if (score >= 200 && score < 500) return "Sketch Seeker";
  if (score >= 500 && score < 700) return "Wall Explorer";
  if (score >= 700 && score < 900) return "Street Art Detective";
  if (score >= 900 && score < 1500) return "Graffiti Scholar";
  return "Street Art Archaeologist";
};

export default assignLevel;
