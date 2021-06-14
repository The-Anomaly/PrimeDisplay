import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import About from "./Components/About/about";
import Buy from "./Components/Buy/buy";
import ExpandedBuy from "./Components/Buy/expandedbuy";
import Contact from "./Components/Contact/contact";
import Landing from "./Components/Landing/landing";
import Services from "./Components/Services/services";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/buy/:product" component={ExpandedBuy} />
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}
export default App;
