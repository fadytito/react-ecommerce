import { Route, Switch } from "react-router";
import "./App.css";
import { ProductsProvider } from "./context/products-context";
import { Footer, Header, Inners } from "./layout";
import { About, Home, Productdetails, Products } from "./pages";

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
