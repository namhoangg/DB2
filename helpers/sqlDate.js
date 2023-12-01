function convertToMySQLDateFormat(dateString) {
  // Create a new Date object from the provided string
  let date = new Date(dateString);

  // Get individual date components
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  let day = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");

  // Create a MySQL-formatted date string
  let mysqlDateFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return mysqlDateFormat;
}

module.exports = convertToMySQLDateFormat;