import React from "react";

function Pagination(props) {
  const { jobsPerPage, totalJobs, currentPage, setCurrentPage } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="pagination">
      <button
        className="prev"
        disabled={currentPage === 1 ? true : false}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="next"
        disabled={currentPage === Math.ceil(totalJobs / jobsPerPage) ? true : false}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;