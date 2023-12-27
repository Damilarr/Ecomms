import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <nav className="md:flex hidden items-center justify-around bg-ash py-5 px-3 lg:px-5">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" className="w-12" />
        </Link>
        <ul className="text-black flex justify-around space-x-3 lg:space-x-7 font-bold text-sm md:text-base">
          <li className="flex justify-around transition-colors duration-700 hover:text-purple pb-1 border-b border-transparent hover:border-purple hover:border-b items-center">
            <Link to={"/shop-now"}>Shop Now</Link>
            <i className="fa px-2 fa-angle-down"></i>
          </li>
          <li className="flex justify-around transition-colors duration-700 hover:text-purple pb-1 border-b border-transparent hover:border-purple hover:border-b items-center">
            <Link to={"/"}>About Us</Link>
            <i className="fa px-2 fa-angle-down"></i>
          </li>
          <li className="flex justify-around group transition-colors duration-700 hover:text-purple pb-1 border-b border-transparent hover:border-purple hover:border-b items-center">
            <Link to={"/cart"}>Cart</Link>
            <i className="fa px-2 text-xl md:text-2xl fa-cart-shopping group-hover:text-black relative">
              <span className="absolute -right-2 -top-2 text-center group-hover:text-black py-[2px] bg-purple text-xs px-[6px] rounded-full">
                {cart.cartItems.length}
              </span>
            </i>
          </li>
        </ul>
        <div className="items-center flex justify-between space-x-2 lg:space-x-3">
          <Link
            to={"/login"}
            className="lg:px-5 px-3 py-1 lg:py-2 text-white rounded-l-full rounded-r-full bg-purple"
          >
            Login
          </Link>
          <button className="lg:px-5 px-3 py-1 lg:py-2 text-purple rounded-l-full rounded-r-full border bg-transparent border-purple">
            Get started
          </button>
        </div>
      </nav>
      <nav className="bg-ash relative py-5 px-5 flex md:hidden items-center justify-between">
        <i
          className="fa fa-bars"
          onClick={() => {
            setIsOpen(true);
          }}
        ></i>
        <Link to={"/cart"} className="flex space-x-6">
          <i className="fa fa-cart-shopping relative text-2xl">
            <span className="absolute -right-2 -top-2  px-[6px] bg-purple text-sm text-center rounded-full">
              {cart.cartItems.length}
            </span>
          </i>
        </Link>
        <div
          className={`popup-overlay absolute ${
            isOpen ? "flex" : "hidden"
          } z-30 h-screen w-screen left-0 top-0 bg-[rgba(106,109,112,0.66)]`}
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white rounded-tr-3xl flex flex-col w-4/5 h-full px-4 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <img src={Logo} alt="Logo" className="w-12" />
              <button
                onClick={() => setIsOpen(false)}
                className="outline-none border-none"
              >
                <i className="fa fa-x"></i>
              </button>
            </div>
            <Link to={"/"} className="flex justify-between items-center">
              <button className="text-left">Home</button>
              <i className="fa fa-home text-opacity-75"></i>
            </Link>
            <Link
              to={"/shop-now"}
              className="flex justify-between items-center"
            >
              <button className="text-left">All Products </button>
              <i className="fa fa-home text-opacity-75"></i>
            </Link>

            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <div className="flex justify-between items-center py-4 font-bold">
              <button className="text-left"> Settings</button>
              <i className="fa fa-arrow-down"></i>
            </div>
            <div className="flex flex-col space-y-4">
              <a href="#" className="w-full flex justify-between">
                My Account <i className="fa fa-user"></i>
              </a>
              <a href="#" className="w-full flex justify-between">
                Language <i className="fa fa-home"></i>
              </a>
              <a href="#" className="w-full flex justify-between">
                My Account <i className="fa fa-user"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
