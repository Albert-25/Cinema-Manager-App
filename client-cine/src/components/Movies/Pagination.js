import React from "react";
import "./Pagination.css"

const Pagination = ({ moviesPerPage, totalMovies, paginate }) => {
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers)

  return (
    <nav>
      <ul className="Pagination__ul">
        {pageNumbers.map(number => (
          <li  key={number} className="Pagination__Li">
            <button onClick={() => paginate(number)} className="Pagination__Button">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;