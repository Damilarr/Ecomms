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
    sessionStorage.getItem("userId")
      ? JSON.parse(sessionStorage.getItem("userId"))
      : null
  );
  const handleSignIn = async (response) => {
    try {
      const res = axios.post(`${url}/auth/google-sign-in`, {
        token: response.credential,
      });
      const data = (await res).data;
      setLoginData(data);
      console.log(data);
      sessionStorage.setItem("userId", JSON.stringify(data._id));
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", true);
      updateUserCart(data._id, JSON.parse(localStorage.getItem("cartItems")));
      sessionStorage.setItem("userId", data._id);
      toast.success(`Signed In as ${data.name}`);
      navigate("/checkout");
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  const updateUserCart = async (userId, products) => {
    try {
      const response = await axios.post(`${url}/user/addToCart`, {
        userId,
        products,
      });

      console.log(response.data); // Log the response from the backend
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  return (
    <section className="py-14 section-padding">
      <h2>Google Login</h2>
      <GoogleLogin onSuccess={handleSignIn} onError={errorOutput} />
    </section>
  );
};

export default Login;
