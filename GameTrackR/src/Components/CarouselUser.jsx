import React, { useState, useEffect } from "react";
import "./Carousel.css";

export const CarouselItemUser = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width, aspectRatio: "1.5" }}>
      {children}
    </div>
  );
};

const CarouselUser = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = children.length - 1;
    } else if (newIndex >= children.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div className="carousel-item" key={index}>
            {child}
          </div>
        ))}
      </div>
      <div className="indicators">
        <button
          className="btn-topdown"
          onClick={() => updateIndex(activeIndex - 1)}
        >
          Previous
        </button>
        <button
          className="btn-topdown"
          onClick={() => updateIndex(activeIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarouselUser;
