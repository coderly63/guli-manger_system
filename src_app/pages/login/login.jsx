import React, { Component } from "react";
import "./login.css";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
//导入网络请求函数
import { userLogin } from "../../api/user";
//导入本地存储函数
export default class login extends Component {
  onFinish = async (user) => {
    const res = await userLogin({ user });
    console.log(res);
    if (res.status === 200) {
      message.success("登陆成功");
      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("user", JSON.stringify(res.user));
      this.props.history.push("/");
    } else message.error(res.errors[0].msg);
  };
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <h1 className="title">React 项目- 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
            validateMessages={this.validateMessages}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  pattern: /^[0-9a-zA-Z_]{4,10}$/,
                  message:
                    "The user name cannot have special characters and length between 4 and 10",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  pattern: /^[0-9a-zA-Z_]{4,10}$/,
                  message:
                    "The user name cannot have special characters and length between 4 and 10",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
