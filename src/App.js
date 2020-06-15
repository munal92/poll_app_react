import React from "react";
import logo from "./logo.svg";
import Home from "./components/Home";
import Navigbar from "./components/NavigBar";
import Footer from "./components/Footer";
import { Switch, Route } from "react-router-dom";
import PollResult from "./components/PollResult";
function App() {
  return (
    <>
      <Navigbar />
      <Switch>
        <Route path="/poll/:itemID">
          <PollResult />
        </Route>
        <Route path="/poll">
          <PollResult />
        </Route>
        <Route>
          <Home path="/" />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
