// components/common/BookLogo.jsx
import React from "react";
import checkzipLogo from "../../assets/checkzip.png";

const BookLogo = ({ className = "w-10 h-10" }) => (
  <img src={checkzipLogo} alt="CheckZip Logo" className={className} />
);

export default BookLogo;
