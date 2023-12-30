import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UseGlobalContext } from "./Context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const options = {
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "signin",
};
const Login = () => {
  const url = import.meta.env.VITE_API_URL;
  const { isAuthenticated, setIsAuthenticated } = UseGlobalContext();
  const navigate = useNavigate();
  const errorOutput = (error) => {
    toast.error(`${error.message}`);
  };
  const [loginData, setLoginData] = useState(
    sessionStorage.getItem("userId") ? sessionStorage.getItem("userId") : null
  );
  const handleSignIn = async (response) => {
    try {
      const res = axios.post(`${url}/auth/google-sign-in`, {
        token: response.credential,
      });
      const data = (await res).data;
      setLoginData(data);
      sessionStorage.setItem("userId", data._id);
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", true);
      updateUserCart(data._id, JSON.parse(localStorage.getItem("cartItems")));
      toast.success(`Signed In as ${data.name}`);
      navigate("/checkout");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  const updateUserCart = async (userId, products) => {
    try {
      const response = await axios.post(`${url}/user/updateCart`, {
        userId,
        products,
      });
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  return (
    <section className="py-14 bg-ash section-padding">
      <h2 className=" py-5 lg:text-6xl font-bold md:text-5xl sm:text-4xl text-3xl text-center md:text-left relative">
        Sign in with Google
      </h2>
      <GoogleLogin onSuccess={handleSignIn} onError={errorOutput} />
    </section>
  );
};

export default Login;
