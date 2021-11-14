import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router";
import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import { Footer, Header, Inners } from "./layout";
import { About, Cart, Checkout, Home, Productdetails, Products } from "./pages";

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
                  <Productdetails />
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
                <Route path="*">
                  <h1>404</h1>
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
