import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const ProductContainer = ({
  children,
  className,
  visibleSlides = 5,
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = React.Children.count(children);
  const maxSlideIndex = totalSlides - visibleSlides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + visibleSlides > maxSlideIndex ? 0 : prev + visibleSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? maxSlideIndex : prev - visibleSlides
    );
  };

  return (
    <div className={classNames("relative w-full overflow-hidden", className)} {...props}>
      <div
        className="flex gap-4 transition-transform duration-300"
        style={{ transform: `translateX(-${(currentSlide * 100) / visibleSlides}%)` }}
      >
        {React.Children.map(children, (child) => (
          <div className="w-full flex-shrink-0" style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
            {child}
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        &#10095;
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(totalSlides / visibleSlides) }).map((_, index) => (
          <span
            key={index}
            className={classNames("block w-3 h-3 bg-gray-800 rounded-full cursor-pointer", {
              "bg-white": index === Math.floor(currentSlide / visibleSlides),
            })}
            onClick={() => setCurrentSlide(index * visibleSlides)}
          />
        ))}
      </div>
    </div>
  );
};

ProductContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  visibleSlides: PropTypes.number,
};
