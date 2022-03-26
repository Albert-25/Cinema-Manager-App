import React from "react";
import "./Pagination.css"

export default function Pagination({ items, setPageSelected, limit}) {
  const buttons = []
  for (let i = 1; i <= Math.ceil(items.length / limit); i++) {
    buttons.push(i);
  }
  
  return (
    <nav>
      <ul className="Pagination__ul">
        {buttons.map(number => (
          <li key={number} onClick={() => setPageSelected(number)} className="Pagination__Li">
            <button className="Pagination__Button">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};