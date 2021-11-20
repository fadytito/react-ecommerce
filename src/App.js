import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router";
import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProductProvider } from "./context/product-context";
import { Footer, Header, Inners } from "./layout";
import {
  About,
  Bookmarks,
  Cart,
  Checkout,
  Home,
  Orders,
  Productdetails,
  Products,
} from "./pages";
import NotFound from "./pages/NotFound";

function App() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <section className="splash">
        <h1>Loading...</h1>
      </section>
    );
  }
  if (error) {
    return (
      <section className="splash">
        <h1>{error.message}</h1>
      </section>
    );
  }
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:inners">
            <Inners>
              <Switch>
                <Route path="/products" exact>
                  <Products />
                </Route>
                <Route path="/products/:id">
                  <ProductProvider>
                    <Productdetails />
                  </ProductProvider>
                </Route>

                <Route path="/about">
                  <About />
                </Route>
                <Route path="/cart">
                  <Cart />
                </Route>
                <ProtectedRoute path="/checkout">
                  <Checkout />
                </ProtectedRoute>
                <ProtectedRoute path="/bookmarks">
                  <Bookmarks />
                </ProtectedRoute>
                <ProtectedRoute path="/orders">
                  <Orders />
                </ProtectedRoute>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Inners>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
