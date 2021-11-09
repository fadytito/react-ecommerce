import { Route, Switch } from "react-router";
import "./App.css";
import { Footer, Header, Inners } from "./layout";
import { About, Cart, Home, Productdetails, Products } from "./pages";

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
                <Route path="/products" exact>
                  <Products />
                </Route>
                <Route path="/products/:id">
                  <Productdetails />
                </Route>
                <Route path="/cart">
                  <Cart />
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
