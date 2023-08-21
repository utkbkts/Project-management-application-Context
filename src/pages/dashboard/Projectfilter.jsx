import React, { useState } from "react";
// import {} from "../../hooks/"

const filterList = ["hepsi", "benim", "masaüstü", "web", "mobil"];
const Projectfilter = ({ currentfilter, changefilter }) => {
  const handleclick = (newfilter) => {
    changefilter(newfilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filtrele:</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleclick(f)}
            className={currentfilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Projectfilter;
