module.exports.paginate = (queryObject, paginateObject) => {
  if (queryObject.limit) {
    paginateObject.limit = parseInt(queryObject.limit);
    paginateObject.limit = paginateObject.limit % 20;
    paginateObject.totalPage = Math.ceil(
      paginateObject.totalRow / paginateObject.limit
    );
  } else {
    paginateObject.totalPage = Math.ceil(
      paginateObject.totalRow / paginateObject.limit
    );
  }
  if (
    queryObject.page &&
    queryObject.page <= paginateObject.totalPage &&
    queryObject.page >= 1
  ) {
    paginateObject.page = parseInt(queryObject.page);
    paginateObject.offset = (paginateObject.page - 1) * paginateObject.limit;
  }
  return paginateObject;
};
