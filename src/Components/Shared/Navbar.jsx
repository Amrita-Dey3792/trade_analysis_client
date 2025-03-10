import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg flex justify-between items-center">
      <Link to="/">
        <svg
          className="w-12"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          id="panel-add"
        >
          <path
            fill="#6563FF"
            d="M18 10h-4V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1ZM7 20H4V10h3Zm5 0H9V4h3Zm5 0h-3v-8h3Zm4-16h-1V3a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V6h1a1 1 0 0 0 0-2Z"
          ></path>
        </svg>
      </Link>
      <label htmlFor="my-drawer-2" className="btn btn-square visible lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
