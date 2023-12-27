import React from "react";
import { BreadCrumbs } from "./ShopNow";
import securePay from "../assets/securePay.png";
import freeDelivery from "../assets/freeDelivery.png";
import cashBack from "../assets/cashBack.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SimilarItems from "./SimilarItems";
import Footer from "./Footer";
import { useGetOneProductQuery } from "../features/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export const Stars = ({ props }) => {
  const { checked, unchecked } = props;
  return (
    <div className="flex justify-around items-center">
      <i className="fa fa-star text-[#FFAD33]"></i>
      <i className="fa fa-star text-[#ABABAB]"></i>
      <p className="text-sm">{nn} reviews</p>
    </div>
  );
};
const ViewProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("id");
  const { data: product, isLoading, error } = useGetOneProductQuery(productId);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  if (isLoading) {
    return <p>Fetching products...</p>;
  }
  return (
    <section className="py-14 flex flex-col bg-ash section-padding space-y-6">
      <span className="text-[#ABABAB]  lg:text-2xl md:text-xl sm:text-base text-xs">
        <Link to={"/"}>Home</Link>
        <Link to={"/shop-now"}>/products</Link>
        <span className="text-black">/product details</span>
      </span>
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="lg:w-1/2 w-full flex  justify-center items-center">
          <img
            src={product.image}
            className="rounded-2xl w-full lg:w-4/5"
            alt={product.title}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 px-4 lg:px-9 space-y-5">
          <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-base text-black font-bold">
            {product.title}
          </h2>
          <p className="  text-[#5D5D6B] text-opacity-60 font-bold sm:text-base text-sm">
            {product.description}
          </p>
          <div className="flex items-center space-x-3 sm:justify-normal justify-between">
            <span className="font-bold text-2xl md:text-3xl lg:text-4xl text-black">
              ${product.price}
            </span>
            <div className="sm:flex justify-around hidden">
              {product.inStock && (
                <span className="text-green-600 bg-zinc-200 text-xs sm:text-sm font-semibold leading-[21px] px-2 sm:px-3 rounded-l-full rounded-r-full py-1">
                  In stock
                </span>
              )}
            </div>
            <span className="font-bold sm:flex hidden text-lg text-[#ABABAB]">
              {product?.size?.map((size) => {
                return <span key={size}>{size} </span>;
              })}
            </span>
          </div>
          <div className="flex space-x-3">
            <div className="flex space-x-3">
              {product?.color[0]?.split(",").map((color) => {
                return (
                  <button
                    key={color}
                    style={{ backgroundColor: `${color}` }}
                    className=" rounded-full border border-transparent h-8 w-8"
                  ></button>
                );
              })}
            </div>
            <div className="flex justify-around sm:hidden">
              {product.inStock && (
                <span className="text-green-600 bg-zinc-200 text- sm:text-sm font-semibold leading-[21px] px-2 sm:px-3 rounded-l-full rounded-r-full py-1">
                  In stock
                </span>
              )}
            </div>
            <span className="font-bold flex sm:hidden text-lg text-[#ABABAB]">
              {product?.size?.map((size) => {
                return <span key={size}>{size} </span>;
              })}
            </span>
          </div>
          <div className="flex space-x-2 items-stretch sm:space-x-4 py-4">
            <div className="flex flex-col space-y-3 h-fit w-fit px-5 py-3 justify-center items-center  bg-white rounded-lg">
              <img src={freeDelivery} alt="freedelivery" className="  w-8" />
              <div className="text-center text-gray-500 text-xs font-bold font-sansation leading-[14px]">
                Free Delivery
              </div>
            </div>
            <div className="flex flex-col space-y-3 h-fit w-fit px-1 sm:px-5 py-3 justify-center items-center  bg-white rounded-lg">
              <img src={cashBack} alt="cashback" className="w-8" />
              <div className="text-center text-gray-500 text-xs font-bold font-sansation leading-[14px]">
                money cash back
              </div>
            </div>
            <div className="flex flex-col space-y-3 h-fit w-fit px-5 py-3 justify-center items-center  bg-white rounded-lg">
              <img src={securePay} alt="secure payment" className="w-8" />
              <div className="text-center text-gray-500 text-xs font-bold font-sansation leading-[14px]">
                Secure Payment
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div className="flex items-center justify-between sm:justify-normal space-x-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="px-3 sm:px-6 py-1 sm:py-3 text-white bg-black border border-black justify-center items-center gap-2 inline-flex"
              >
                Add To Cart
              </button>
              <button className="px-3 sm:px-6 py-1 sm:py-3 border border-black justify-center items-center gap-2 inline-flex">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <SimilarItems heading="Frequently Bought Together" data={product} />
    </section>
  );
};

export default ViewProduct;
