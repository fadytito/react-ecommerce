import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { CartProvider } from "./context/cart-context";
import { ProductsProvider } from "./context/products-context";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);
