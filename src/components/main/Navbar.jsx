import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import bikeLogo from "../../assets/bike.png"
import adminLogo from "../../assets/admin.png"
import {
  Collapse,
  initTE,
} from "tw-elements";

function Navbar() {
  useEffect(() => {
    initTE({ Collapse });
  }, []);

  return (
    <nav className="z-50 flex w-full sticky top-0 py-0.5 md:py-1 lg:flex-wrap lg:justify-start flex-nowrap items-center justify-between bg-[#81b64c]" data-te-navbar-ref="">
      <div className="px-3 w-full flex flex-wrap items-center justify-between">
        <div className="relative ml-2">
          <div className="absolute -top-5">
            <img className="w-8" src={bikeLogo} alt="" />
          </div>
          <Link className="text-2xl font-semibold text-white">Bike.com</Link>
          <Link to={"/"} className="ml-4 text-white">Products</Link>
        </div>
        <div className="relative pt-2 flex flex-col items-center mr-2">
          <div className="rounded-full overflow-hidden bg-white">
            <img className="w-12" src={adminLogo} alt="Admin Logo" />
          </div>
          <span className="font-[Roboto] font-semibold text-center text-[0.7rem] text-red-600">Admin Login</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
