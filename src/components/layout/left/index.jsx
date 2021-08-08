import React, { Component } from "react";
import "./left.css";
import png from "./image/后台.png";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../../config/menuConfig";
import * as Icon from "@ant-design/icons";
const { SubMenu } = Menu;

class Left extends Component {
  getMenuListNode(menuList) {
    return menuList.map((item) => {
      const icon = React.createElement(Icon[item.icon]);
      if (!item.children) {
        return (
          <Menu.Item key={item.to} icon={icon}>
            <Link to={item.to}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.to} icon={icon} title={item.title}>
            {this.getMenuListNode(item.children)}
          </SubMenu>
        );
      }
    });
  }
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="left">
        <Link to="/home" className="title">
          <img src={png} alt="title" />
          <h2>谷粒后台</h2>
        </Link>
        <div style={{ width: 200 }}>
          <Menu selectedKeys={[path]} mode="inline" theme="dark">
            {this.getMenuListNode(menuList)}
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(Left);
