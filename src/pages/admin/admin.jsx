import React, { Component } from "react";
import Bottom from "../../components/layout/bottom";
import Left from "../../components/layout/left";
import Top from "../../components/layout/top";
import { Layout } from "antd";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "../home/home";
import Category from "../category/category";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
const { Header, Footer, Sider, Content } = Layout;

export default class admin extends Component {
  render() {
    const auth = window.localStorage.getItem("token");
    if (!auth) this.props.history.replace("/login");
    return (
      <>
        {auth ? (
          <Layout style={{ height: "100vh" }}>
            <Sider>
              <Left></Left>
            </Sider>
            <Layout>
              <Header style={{ padding: "0" }}>
                <Top></Top>
              </Header>
              <Content>
                <Switch>
                  <Redirect from="/" exact to="/home" />
                  <Route path="/home" component={Home} />
                  <Route path="/category" component={Category} />
                  <Route path="/product" component={Product} />
                  <Route path="/user" component={User} />
                  <Route path="/role" component={Role} />
                  <Route path="/charts/bar" component={Bar} />
                  <Route path="/charts/pie" component={Pie} />
                  <Route path="/charts/line" component={Line} />
                </Switch>
              </Content>
              <Footer style={{ backgroundColor: "#fff" }}>
                <Bottom></Bottom>
              </Footer>
            </Layout>
          </Layout>
        ) : (
          ""
        )}
      </>
    );
  }
}
