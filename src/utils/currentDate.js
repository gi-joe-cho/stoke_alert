const currentDate = () => {
  let currentDate = new Date();
  let formattedCurrentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  return formattedCurrentDate;
}

export default currentDate;