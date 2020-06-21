import React from "react";
import Home from "./components/Home";
import Navigbar from "./components/NavigBar";
import Footer from "./components/Footer";
import { Switch, Route } from "react-router-dom";
import PollResult from "./components/PollResult";
import { ToastContainer, toast } from "react-toastify";
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
      <ToastContainer />
    </>
  );
}

export default App;
