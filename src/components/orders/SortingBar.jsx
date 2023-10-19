import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

export default function SortingBar({ onSortChange }) {
  const [sortByDateOrder, setSortByDateOrder] = useState("asc");
  const [sortByProductsOrder, setSortByProductsOrder] = useState("asc");

  const handleSortByDate = () => {
    setSortByDateOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    onSortChange("date", sortByDateOrder);
  };

  const handleSortByProducts = () => {
    setSortByProductsOrder((prevOrder) =>
      prevOrder === "asc" ? "desc" : "asc"
    );
    onSortChange("products", sortByProductsOrder);
  };

  return (
    <div className="sortingBar">
      <div className="sortBy">
        <SortIcon /> Sort by:
      </div>

      <div className="selection">
        <button onClick={handleSortByDate}>
          {sortByDateOrder === "asc" ? <NorthIcon /> : <SouthIcon />} Creation
          Date
        </button>
        <button onClick={handleSortByProducts}>
          {sortByProductsOrder === "asc" ? <NorthIcon /> : <SouthIcon />} Number
          of Items
        </button>
      </div>
    </div>
  );
}
