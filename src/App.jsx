import React, { Component } from "react";
import { message } from "antd";
import "antd/dist/antd.less";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
export default class App extends Component {
  handleClick = () => {
    message.success("点击点击点击点击点击点击");
  };
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" component={Admin}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
