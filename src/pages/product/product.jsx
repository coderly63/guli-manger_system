import React, { Component, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
const Home = lazy(() => import("./home"));
const Detail = lazy(() => import("./detail"));
const Add = lazy(() => import("./add"));

export default class product extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Suspense fallback={<LoadingOutlined />}>
            <Route path="/product" component={Home} exact></Route>
            <Route path="/product/add" component={Add}></Route>
            <Route path="/product/detail" component={Detail}></Route>
          </Suspense>
        </Switch>
      </div>
    );
  }
}
