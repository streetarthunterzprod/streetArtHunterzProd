/* eslint-disable prefer-destructuring */
function formatDate(registrationDate) {
  const registrationDateObj = registrationDate
    ? new Date(registrationDate)
    : null;

  let formattedDate = "";

  if (registrationDateObj && !Number.isNaN(registrationDateObj.getTime())) {
    formattedDate = registrationDateObj.toISOString().split("T")[0];
  }
  return formattedDate;
}

export default formatDate;
