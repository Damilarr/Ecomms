import React, { useEffect, useState } from "react";
import Master from "../assets/master.png";
import visa from "../assets/visa.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseProductQuantity,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import { Link } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";

const Checkout = () => {
  const [address, setAddress] = useState({
    address: "Mirpur-10, Road 14A Dhaka, Bangladesh",
    phoneNo: "+234758187028",
  });
  const [editable, setEditable] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleIncreaseQuantity = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handleDecreaseQuantity = (cartItem) => {
    dispatch(decreaseProductQuantity(cartItem));
  };
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (e) => {
    console.log(e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const makePayment = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_1265b9110c7bdbb3da8ab25fbdea5d0f307749e5",
      amount: cart.cartTotalAmount * 100,
      email: userDetails.email,
      firstname: userDetails.firstName,
      lastname: userDetails.lastName,
    });
  };
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <section className="py-14 flex-col space-y-4 lg:space-y-0 flex lg:flex-row lg:justify-between lg:space-x-10 bg-ash section-padding">
      <div className="lg:w-1/2 md:w-4/5 w-full flex flex-col space-y-5 mx-auto">
        <div className="flex flex-col space-y-2 bg-white p-4 rounded-xl">
          <div className="flex  justify-between">
            <h2 className="text-black text-lg sm:text-xl md:text-2xl font-bold">
              Shipping Information
            </h2>
            <button
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit Address
              <i class="fa-solid px-1 fa-pen-nib"></i>
            </button>
          </div>
          <span className="text-neutral-500 text-sm sm:text-base font-normal">
            Address &mdash;{" "}
            <input
              type="text"
              readOnly={!editable}
              name="address"
              value={address.address}
              className={`outline-none border ${
                editable ? "border-purple" : "border-transparent"
              }`}
              onChange={handleAddressChange}
            />
          </span>
          <span className="text-neutral-500 text-sm sm:text-base font-normal">
            Phone Number &mdash;{" "}
            <input
              type="text"
              name="phoneNo"
              readOnly={!editable}
              value={address.phoneNo}
              className={`outline-none border ${
                editable ? "border-purple" : "border-transparent"
              }`}
              onChange={handleAddressChange}
            />
          </span>
          {editable && (
            <button
              onClick={() => {
                setEditable(false);
              }}
              className="px-5 py-1 w-fit bg-black text-white rounded-md"
            >
              Save
            </button>
          )}
        </div>
        {/* <div className="flex flex-col space-y-2 bg-white p-4 rounded-xl">
          <h2 className="text-black text-lg sm:text-xl md:text-2xl font-bold">
            Select your Payment Card
          </h2>
          <form className="flex flex-col">
            <div className="flex space-x-3">
              <input type="radio" name="cardType" />
              <div className="flex space-x-2">
                <img src={Master} alt="master card" className="w-5" />
                <img src={visa} alt="visa card" className="w-5" />
              </div>
            </div>
            <div className="flex">
              <input type="radio" name="cardType" />
              <span className="px-2">Cash on delivery</span>
            </div>
          </form>
        </div> */}
        <form className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              className="border-black border-opacity-30 border-2 rounded-md py-2 px-4"
              placeholder="Enter Your first Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="border-black border-opacity-30 border-2 rounded-md py-2 px-4"
              placeholder="Enter Your Last Name"
              name="lastName"
              value={userDetails.phoneNo}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between space-x-3 lg:space-x-4">
            <div className="w-full flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="border-black border-opacity-30 w-full border-2 rounded-md py-2 px-4"
                placeholder="Enter Your Email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <button
          onClick={makePayment}
          className="bg-black hidden lg:block text-center text-white py-2 px-4 rounded-l-full rounded-r-full"
        >
          Confirm and Pay
        </button>
      </div>
      <div className="lg:w-1/2 md:w-4/5 w-full flex flex-col space-y-4 mx-auto">
        <h2 className="font-bold text-black hidden lg:flex text-2xl">
          Order Review
        </h2>
        <section className="py-5 hidden lg:flex flex-col">
          {cart.cartItems.map((cartItem) => {
            return (
              <div
                className="flex justify-between items-start space-x-5 shadow border border-white  mb-3 p-4 rounded-xl"
                key={cartItem.title}
              >
                <img
                  src={cartItem.image}
                  alt={cartItem.title}
                  className="  h-24 w-24  sm:h-36 sm:w-36   rounded-xl"
                />
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col space-y-2">
                      <p className="text-black text-sm sm:text-base md:text-lg">
                        {cartItem.title}
                      </p>
                      <p className="text-[#5d5d6b] text-opacity-60 text-xs sm:text-sm md:text-base">
                        {cartItem.description.slice(0, 64)}
                      </p>
                    </div>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      <i className="fa fa-trash-can sm:text-2xl"></i>
                    </button>
                  </div>
                  <div className="flex justify-between items-center space-x-3">
                    <h6 className="text-xl font-bold">${cartItem.price}</h6>
                    <div className="flex space-x-0">
                      <button
                        onClick={() => handleDecreaseQuantity(cartItem)}
                        className="border border-black px-2 sm:p-2 font-bold border-opacity-10 sm:w-10 text-neutral-300"
                      >
                        &mdash;
                      </button>
                      <button className="border font-bold px-3 border-black border-opacity-10 sm:w-10 text-black">
                        {cartItem.cartQuantity}
                      </button>
                      <button
                        onClick={() => handleIncreaseQuantity(cartItem)}
                        className="border text-2xl px-2 border-black border-opacity-10  sm:w-10 text-neutral-300"
                      >
                        &#x2B;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <div className="flex flex-col w-full space-y-3">
          <h2 className="text-bold text-black text-2xl font-bold">
            Order Summary
          </h2>
          <div className="flex flex-col">
            <div className="flex justify-between pb-2 border-b border-opacity-10 text-black text-opacity-50 text-base font-bold">
              <span>Sub Total</span>
              <span>${cart.cartTotalAmount}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-opacity-10 text-black text-opacity-50 text-base font-bold">
              <span>Discount</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-opacity-10 text-black text-opacity-50 text-base font-bold">
              <span>Delivery Fee</span>
              <span>$ 0.00</span>
            </div>
          </div>
          <div className="flex justify-between text-black text-base font-bold">
            <span>Total</span>
            <span>${cart.cartTotalAmount}</span>
          </div>
          <button
            onClick={makePayment}
            className="bg-black lg:hidden block text-center text-white py-2 px-4 rounded-l-full rounded-r-full"
          >
            Confirm and Pay
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
