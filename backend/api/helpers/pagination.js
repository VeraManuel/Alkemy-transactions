const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPaginationData = (data, page, limit) => {
  const { count: totalOperations, rows: operations } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalOperations / limit);

  return { totalOperations, operations, totalPages, currentPage };
};

module.exports = { getPagination, getPaginationData };
