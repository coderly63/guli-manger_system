import React, { Component } from "react";
import "./category.css";
import { Card, Button, Table } from "antd";
import { EditFilled, ArrowRightOutlined } from "@ant-design/icons";
import { searchCategory } from "../../api/category";
import LinkButton from "../../components/link-button";
import AddModal from "./addModal";
import UpdateModal from "./updateModal";
export default class Category extends Component {
  state = {
    goods: [],
    level: 0,
    parentId: 0,
    name: [{ name: "一级分类列表", _id: 0 }],
    showStatus: 0,
    category: {},
  };
  columns = [
    {
      title: "分类的名称",
      dataIndex: "name",
      width: "70%",
    },
    {
      title: "操作",
      render: (category) => (
        <span key={category.key}>
          <LinkButton onClick={() => this.showModal(2, category)}>
            修改分类
          </LinkButton>
          <LinkButton onClick={this.getCategory(category)}>
            查看子分类
          </LinkButton>
        </span>
      ),
    },
  ];
  getCategory(category) {
    return async () => {
      let { level, name } = this.state;
      const parentId = category._id || 0;
      let { goods } = await searchCategory(parentId);
      if (parentId !== 0) {
        name = [...name, category];
        goods = [...this.state.goods, goods];
        level += 1;
        this.setState({ parentId, name, level, goods });
      } else
        this.setState({
          parentId: 0,
          goods: [goods],
          name: [{ name: "一级分类列表", _id: "0" }],
          level: 0,
        });
    };
  }
  getCurrentCategory = async (parentId) => {
    const { name, goods } = this.state;
    const { goods: changedGoods } = await searchCategory(parentId);
    const index = name.findIndex((item) => item._id === parentId);
    goods[index] = changedGoods;
    const newGoods = goods;
    this.setState({ goods: newGoods });
  };
  toLevel = (i) => {
    const goods = this.state.goods.splice(0, i + 1);
    const name = this.state.name.splice(0, i + 1);
    this.setState({ goods, name, level: i });
  };
  showModal = (i, category) => {
    this.setState({ showStatus: i, category });
  };
  hideModal = () => {
    this.setState({ showStatus: 0 });
  };

  componentDidMount() {
    this.getCategory({})();
  }
  render() {
    const { goods, level, name, showStatus, category } = this.state;
    const length = name.length;
    const title = (
      <span>
        {name.map((item, i) => {
          if (i < length - 1) {
            return (
              <React.Fragment key={item._id}>
                <LinkButton onClick={() => this.toLevel(i)}>
                  {item.name}
                </LinkButton>
                <ArrowRightOutlined style={{ marginRight: "10px" }} />
              </React.Fragment>
            );
          } else return <span key={item._id}>{item.name}</span>;
        })}
      </span>
    );
    return (
      <div className="category">
        <AddModal
          showStatus={showStatus}
          hideModal={this.hideModal}
          name={name}
          getCurrentCategory={this.getCurrentCategory}
        ></AddModal>
        <UpdateModal
          showStatus={showStatus}
          hideModal={this.hideModal}
          category={category}
        ></UpdateModal>
        <Card
          title={title}
          extra={
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => this.showModal(1, {})}
            >
              添加
            </Button>
          }
        >
          <Table
            dataSource={goods[level]}
            columns={this.columns}
            bordered
            rowKey="_id"
            pagination={{ defaultPageSize: "6" }}
          />
        </Card>
      </div>
    );
  }
}
