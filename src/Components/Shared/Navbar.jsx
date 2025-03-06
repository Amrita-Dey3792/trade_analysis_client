import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-[100]">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-3">
        <svg className="w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chart-pie"><path fill="#6563FF" d="M12,2a10,10,0,1,0,4.93,18.69l.07,0,.05,0A10,10,0,0,0,12,2Zm1,2.07A8,8,0,0,1,19.93,11H13ZM12,20A8,8,0,0,1,11,4.07V12a1.09,1.09,0,0,0,.07.35l0,.08,0,.07,4,6.87A7.81,7.81,0,0,1,12,20Zm4.83-1.64L13.73,13h6.2A8,8,0,0,1,16.83,18.36Z"></path></svg>
          <h2 className="text-2xl font-semibold">
          TELE-TRADE
          </h2>
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
