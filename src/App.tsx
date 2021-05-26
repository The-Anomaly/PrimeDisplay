import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import About from "./Components/About/about";
import Contact from "./Components/Contact/contact";
import Landing from "./Components/Landing/landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
export default App;
