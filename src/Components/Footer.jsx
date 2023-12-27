import React from "react";
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <section className="py-14 flex flex-col px-4 sm:px-6 md:px-10 lg:px-14 justify-between space-y-5 bg-ash">
      <div className="flex flex-col text-gray w-full space-y-5 lg:hidden">
        <img src={Logo} alt="Logo" className="w-12" />
        <span className="text-sm">
          Join our newsletter to stay up to date on features and releases.
        </span>
        <div className="flex space-x-3 justify-between items-center">
          <input
            type="text"
            className="border border-gray py-1 px-1 md:py-2 md:px-2 w-3/4 outline-none"
            placeholder="Enter your Email"
          />
          <button className="bg-transparent text-center px-3 py-1 md:px-5 rounded-l-full rounded-r-full md:py-2 border border-gray outline-none ">
            Subscribe
          </button>
        </div>
        <span className="text-xs text-center">
          By subscribing you agree to with our Privacy Policy and provide
          consent to receive updates from our company.
        </span>
      </div>
      <div className="flex justify-around space-x-4 md:space-x-7 lg:space-x-10 items-start">
        <div className="hidden lg:flex flex-col text-gray w-2/5 space-y-5">
          <img src={Logo} alt="Logo" className="w-12" />
          <span className="text-sm">
            Join our newsletter to stay up to date on features and releases.
          </span>
          <div className="flex space-x-3 justify-between items-center">
            <input
              type="text"
              className="border border-gray py-2 px-2 w-3/4 outline-none"
              placeholder="Enter your Email"
            />
            <button className="bg-transparent w-1/4 px-4 rounded-l-full rounded-r-full py-2 border border-gray outline-none ">
              Subscribe
            </button>
          </div>
          <span className="text-xs">
            By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.
          </span>
        </div>
        <ul className="text-gray text-xs md:text-sm lg:text-base w-1/3 lg:w-1/5 space-y-2">
          <li className="text-black font-bold">About us</li>
          <li>FAQ</li>
          <li>Contact</li>
          <li>Returns</li>
          <li>Blog</li>
          <li>Shipping</li>
        </ul>
        <ul className="text-gray text-xs md:text-sm lg:text-basew-1/3 lg:w-1/5 space-y-2">
          <li className="text-black font-bold">Customer support</li>
          <li>Affiliates</li>
          <li>Apple pay payments</li>
          <li>Returns</li>
          <li>Returns Policy</li>
          <li>Returns</li>
        </ul>
        <ul className="text-gray text-xs md:text-sm lg:text-base w-1/3 lg:w-1/5 space-y-2">
          <li className="text-black font-bold">Follow us</li>
          <li>
            <i className="fa-brands pr-1 md:pr-3 fa-facebook"></i>Facebook
          </li>
          <li>
            <i className="fa-brands pr-1 md:pr-3 fa-instagram"></i>Instagram
          </li>
          <li>
            <i className="fa-brands pr-1 md:pr-3 fa-twitter"></i>Twitter
          </li>
          <li>
            <i className="fa-brands pr-1 md:pr-3 fa-linkedin"></i>Linkedin
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:flex-row text-gray text-xs items-center justify-between">
        <span> &copy; 2023 GFirnuture. All rights reserved.</span>
        <div className="flex items-center space-x-4 justify-between">
          <span>Privacy Policy</span>
          <span>Terms of service</span>
          <span>cookie settings</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
