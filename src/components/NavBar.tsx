import React from "react";
import Logo from "../Assets/logo.png";
import { RxAvatar } from "react-icons/rx";
import {  Link } from "react-router-dom";

const NavBar: React.FC = () => {

 

  return (
    <nav className="flex w-full text-xl justify-between items-center h-12 rounded-l border-2 shadow-slate-100 sticky top-0 border-slate-200 px-2 bg-white">
      <section className="flex items-center gap-2 w-full md:w-1/3 sm:w-1/2">
        <img src={Logo} className="object-cover h-10 w-10" alt="Logo" />
        <strong>Fake_Store</strong>
      </section>
      <section className="flex items-center w-full md:w-1/3 sm:w-1/2 px-2">
        <ul className="flex w-full justify-between items-center h-full">
          <li className="flex items-center hover:bg-slate-100 text-emerald-600 rounded-l py-1">
            <Link  to ="/products" className="text-center flex text-emerald-400 px-2" >
              Home
            </Link>
          </li>
          <li className="flex items-center hover:bg-slate-100 text-emerald-600 rounded-l py-1">
            <Link to ="/cart" className="text-center flex text-emerald-400 px-2" >
              Cart
            </Link>
          </li>
          <li className="flex items-center text-emerald-400">
            <button>
              <RxAvatar className="text-3xl" />
            </button>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default NavBar;