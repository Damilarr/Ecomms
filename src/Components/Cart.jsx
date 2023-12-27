import React, { useEffect } from "react";
import { BreadCrumbs } from "./ShopNow";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseProductQuantity,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import SimilarItems from "./SimilarItems";
import { UseGlobalContext } from "./Context";

const Cart = () => {
  const { isauthenticated, setIsAuthenticated } = UseGlobalContext();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!isauthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };
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
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <section className="py-14 flex flex-col space-y-5 section-padding bg-ash">
      <h2 className="headerText">Your Shopping Cart</h2>
      <BreadCrumbs />
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Your Cart is currently empty.</p>
          <Link to={"/shop-now"}>Continue Shopping</Link>
        </div>
      ) : (
        <section className="flex flex-col lg:flex-row lg:space-x-5 justify-between lg:items-start">
          <div className="relative hidden lg:block overflow-x-auto w-4/5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-ash">
              <thead className="text-xs text-black">
                <tr className="">
                  <th scope="col" className="py-4 pl-5">
                    <span className="px-6 py-3 rounded-l-full rounded-r-full text-black w-fit bg-blue-100">
                      Items
                    </span>
                  </th>
                  <th scope="col" className="py-4 pl-5">
                    <span className="px-6 py-3 rounded-l-full rounded-r-full text-black w-fit bg-blue-100">
                      Description
                    </span>
                  </th>
                  <th scope="col" className="py-4 pl-5">
                    <span className="px-6 py-3 rounded-l-full rounded-r-full text-black w-fit bg-blue-100">
                      Quantity
                    </span>
                  </th>
                  <th scope="col" className="py-4 pl-5">
                    <span className="px-6 py-3 rounded-l-full rounded-r-full text-black w-fit bg-blue-100">
                      Price
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => {
                  return (
                    <tr key={item._id} className="border-opacity-50 border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 flex flex-col items-start font-medium text-gray-900 whitespace-nowrap"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-36 w-36  rounded-xl"
                        />
                      </th>
                      <td class="px-6 py-4">
                        <div className="flex items-start flex-col space-y-3">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <span className="text-[#5d5d6b] text-opacity-60 text-xs font-bold">
                            {item.description.slice(0, 80)}
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div className="flex flex-col space-y-3 items-start">
                          <button onClick={() => handleRemoveFromCart(item)}>
                            <i class="fa-solid fa-trash-can"></i>
                          </button>
                          <div className="flex space-x-0">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="border border-black p-2 font-bold border-opacity-10 w-10 text-neutral-300"
                            >
                              &mdash;
                            </button>
                            <button className="border font-bold border-black border-opacity-10 w-10 text-black">
                              {item.cartQuantity}
                            </button>
                            <button
                              onClick={() => handleIncreaseQuantity(item)}
                              className="border text-2xl  border-black border-opacity-10 w-10 text-neutral-300"
                            >
                              &#x2B;
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-black text-2xl text-left font-bold">
                        ${item.price}.00
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <section className="py-5 lg:hidden flex flex-col">
            {cart.cartItems.map((cartItem) => {
              return (
                <div
                  className="flex justify-between items-start space-x-5 sm:items-center shadow border border-white  mb-3 p-4 rounded-xl"
                  key={cartItem.title}
                >
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    className="  h-24 w-24  sm:h-36 sm:w-36 rounded-xl"
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
          <div className="flex flex-col w-full lg:w-1/5 space-y-3">
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
              onClick={handleNavigate}
              className="bg-black text-center text-white py-2 px-4 rounded-l-full rounded-r-full"
            >
              Go to ChcekOut
            </button>
            <Link
              to={"/shop-now"}
              className="border-black border text-center text-black py-2 px-4 rounded-l-full rounded-r-full"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      )}
      <SimilarItems heading="You may Like" />
    </section>
  );
};

export default Cart;
