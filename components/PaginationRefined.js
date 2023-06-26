const PaginationRefined = ({totalProducts, productsPerPage, setCurrentPage, currentPage}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalProducts/productsPerPage); i++) {
    pages.push(i);
  }

  // scroll to page top when clicking button
  function buttonClick(page) {
    setCurrentPage(page)
    window.scrollTo(0, 0);
  }

  return (
    <div className="flex justify-center">
      {pages.map((page, index) => {
        return (
          <button
            className={`mx-1 bg-gray-700 text-white font-bold py-2 px-4  ${page == currentPage ? 'bg-gray-950' : 'hover:bg-blue-700'}`}
            key={index}
            onClick={() => buttonClick(page)}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationRefined;