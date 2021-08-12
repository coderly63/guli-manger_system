import React, { Component } from "react";
import "./top.css";
import { withRouter } from "react-router-dom";
import { formateDate } from "../../../utils/dateUtils";
import menuList from "../../../config/menuConfig";
import LinkButton from "../../link-button";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
class Top extends Component {
  state = {
    currentTime: "",
  };
  timer = null;
  componentDidMount() {
    this.timer = setInterval(() => {
      let currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getTitle(menuList, path) {
    for (let item of menuList) {
      if (path.indexOf(item.to) !== -1) return item.title;
      else if (item.children) {
        let title = this.getTitle(item.children, path);
        if (title) return title;
      }
    }
  }
  logout = () => {
    const history = this.props.history;
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
        history.push("/login");
      },
    });
  };
  render() {
    const user = JSON.parse(window.localStorage.getItem("user")) || null;
    const username = user ? user.username : null;
    const path = this.props.location.pathname;
    const title = this.getTitle(menuList, path);
    return (
      <div className="header">
        <div className="header-top">
          <div className="image">
            <img src={user.avatorUrl} alt="avator" />
          </div>
          <div className="username">{username}</div>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Top);
