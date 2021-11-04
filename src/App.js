import { Route, Switch } from "react-router";
import "./App.css";
import { ProductsProvider } from "./context/products-context";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Inners from "./layout/Inners";
import About from "./pages/About";
import Home from "./pages/Home";
import Productdetails from "./pages/ProductDetails";
import Products from "./pages/Products";

function App() {
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
                <Route path="/products">
                  <ProductsProvider>
                    <Products />
                  </ProductsProvider>
                </Route>
                <Route path="/products/:id">
                  <Productdetails />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
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
