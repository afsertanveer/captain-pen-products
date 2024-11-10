const pagination = (totalCount, currentPage) => {
  const perPage = 50;
  let hasPrevPage = false;
  let hasNextPage = false;
  let skippedIndex = (currentPage - 1) * perPage;
  let totalPages = Math.ceil(Number(totalCount) / perPage);
  if (Number(currentPage) >= totalPages) {
    hasPrevPage = false;
    hasNextPage = false;
  } else if (Number(currentPage) == 1) {
    hasPrevPage = false;
    hasNextPage = true;
  } else if (Math.ceil(Number(totalCount) / perPage) == Number(currentPage)) {
    hasNextPage = false;
    hasPrevPage = true;
  } else {
    hasNextPage = true;
    hasPrevPage = true;
  }
  let paginateData = {
    totalCount: Number(totalCount),
    currentPage: Number(currentPage),
    perPage: Number(perPage),
    hasNextPage: Boolean(hasNextPage),
    hasPrevPage: Boolean(hasPrevPage),
    totalPages: Number(totalPages),
    skippedIndex: Number(skippedIndex),
  };
  return paginateData;
};
module.exports = pagination;
