import React, { useState } from 'react';

const Carousel = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? props.items.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === props.items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const translateXValue = -currentImageIndex * 100;

  return (
    <div className="carousel">
      <div
        className="carousel-container overflow-hidden"
        style={{ transform: `translateX(${translateXValue}%)` }}
      >
       {props.children}
      </div>

      <button
        onClick={previousImage}
        className="btn btn-primary"
      >
        Previous
      </button>
      <button
        onClick={nextImage}
        className="btn btn-primary"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
