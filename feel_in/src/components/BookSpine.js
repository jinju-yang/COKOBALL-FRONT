import React, { useState } from "react";

const BookSpine = ({bookname = "Test"}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">Error loading book spine</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
        className={`w-16 sm:w-20 md:w-24 h-64 sm:h-80 md:h-96 bg-[#A08375] rounded-r-lg shadow-lg transform transition-all duration-300 ease-in-out ${
          isClicked ? "scale-105" : "hover:scale-105"
        }`}
        onClick={handleClick}
        onKeyPress={(e) => e.key === "Enter" && handleClick()}
        tabIndex={0}
        role="button"
        aria-label="Book spine"
      >
        <div className="h-full flex flex-col justify-between p-4">
          <div className="writing-mode-vertical text-white text-lg sm:text-xl md:text-2xl font-serif">
            {bookname}
          </div>
          <div className="text-white text-sm sm:text-base md:text-lg font-sans">
            Author
          </div>
        </div>
      </div>
  );
};

export default BookSpine;