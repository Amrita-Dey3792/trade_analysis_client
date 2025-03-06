import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-[100]">
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 33.867 33.867"
          id="stock-chart"
        >
          <defs>
            <linearGradient id="a">
              <stop offset="0" stopColor="#f6f600" />
              <stop offset="1" stopColor="#f69134" />
            </linearGradient>
            <linearGradient id="b">
              <stop offset="0" stopColor="#f5f8ff" />
              <stop offset="1" stopColor="#a0c9ff" />
            </linearGradient>
          </defs>
          <path
            fill="#06f"
            d="M43.818 24.5c-2.014-.018-3.95.776-5.373 2.201L12 56.787v12.586L43.752 42.607l42.539 42.539c-4.49 1.66-4.648 6.93.268 8.248l14.027 2.785c2.11.468 4.083-.364 5.342-1.625 1.261-1.259 2.089-3.231 1.621-5.342l-3.53-14.025c-.944-3.524-5.327-5.488-8.028-.81L49.053 26.701c-1.389-1.39-3.269-2.181-5.235-2.201z"
            transform="scale(.26458)"
          />
          <path
            fill="#00a1ff"
            d="M115.162 9.113l-14.006 2.861c-4.474 1.199-4.025 5.485-2.16 7.139.49.435 1.103.799 1.826 1.074L14.203 109.82h14.318l82.793-79.178c1.784 4.234 7.254 4.095 8.145-.563l2.709-14.04c.456-2.113-.386-4.082-1.654-5.334-.95-.941-3.216-2.164-5.352-1.592z"
            transform="scale(.26458)"
          />
          <path
            fill="#a8d0ff"
            d="M2.382 1.058c-.73 0-1.321.592-1.321 1.322v28.473c0 1.083.872 1.955 1.955 1.955h28.473c1.083 0 1.955-.872 1.955-1.955s-.872-1.955-1.955-1.955H3.704V2.38c0-.73-.592-1.322-1.322-1.322z"
          />
          <path
            fill="#00a1ff"
            d="M6.409 2.381a.662.662 0 0 0 0 1.324h.813a.662.662 0 0 0 0-1.324zM6.409 5.887a.662.662 0 0 0 0 1.324h.813a.662.662 0 0 0 0-1.324z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Navbar;
