module.exports.filterSearch = (queryObject) => {
  if (queryObject.keyword) {
    return `WHERE ${queryObject.type} LIKE '%${queryObject.keyword}%'`;
  } else {
    return "";
  }
};
