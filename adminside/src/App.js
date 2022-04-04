import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import React, { Component } from 'react';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import CreateAccount from "./components/CreateAccount";
import AdminAccount from "./components/AdminAccount";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import Inventory from "./components/Inventory";


function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/signin"} component={SignIn}/>
                <Route exact path={"/createaccount"} component={CreateAccount}/>
                <Route exact path={"/account"} component={AdminAccount}/>
                <Route exact path={"/menu"} component={Menu}/>
                <Route exact path={"/orders"} component={Orders}/>
                <Route exact path={"/inventory"} component={Inventory}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
