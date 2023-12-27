import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { productsApi } from "./features/productsApi.js";
import cartReducer, { getTotals } from "./features/cartSlice.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="430748875043-rd6kpfkvguv5u3ca209krafhubtu2jki.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
