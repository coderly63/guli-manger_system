import LinkButton from "../../components/link-button";
import { searchProduct } from "../../api/product";
import React, { Component } from "react";
import { Button, Table, Input, Select, Card, Tag } from "antd";
import { EditFilled } from "@ant-design/icons";
const { Option } = Select;
export default class home extends Component {
  state = {
    products: [],
    limit: 3,
    count: 0,
  };
  columns = [
    {
      width: "20%",
      title: "商品名称",
      dataIndex: "name",
      className: "name",
    },
    {
      width: "35%",
      title: "商品描述",
      dataIndex: "desc",
      className: "desc",
    },
    {
      width: "10%",
      title: "价格",
      dataIndex: "price",
      render: (price) => (
        <Tag color="orange" style={{ fontSize: "15px" }}>
          {price} 元
        </Tag>
      ),
    },
    {
      width: "15%",
      title: "状态",
      dataIndex: "status",
      render: (status) => {
        return (
          <span>
            {status === "0" ? (
              <Button type="primary" danger>
                下架
              </Button>
            ) : (
              <Button type="primary">在售</Button>
            )}
          </span>
        );
      },
    },
    {
      width: "20%",
      title: "操作",
      render: (product) => {
        return (
          <span>
            <LinkButton
              onClick={() =>
                this.props.history.push("/product/detail", { product })
              }
            >
              详情
            </LinkButton>
            <LinkButton
              onClick={() =>
                this.props.history.push("/product/add", { product })
              }
            >
              修改
            </LinkButton>
          </span>
        );
      },
    },
  ];
  addProduct = () => {
    this.props.history.push("/product/add");
  };
  async componentDidMount() {
    const { products, count } = await searchProduct();
    this.setState({ products, count });
  }
  searchRef = React.createRef();
  search = async (offset = 0) => {
    const { limit } = this.state;
    const value = this.searchRef.current.state.value;
    const key = value ? value : 0;
    const { products, count } = await searchProduct(key, offset, limit);
    this.setState({ products, count });
  };
  pageChange = (page) => {
    const { limit } = this.state;
    const offset = (page - 1) * limit;
    this.search(offset);
  };
  render() {
    const { products, limit, count } = this.state;
    const title = (
      <span>
        <Select defaultValue="1" style={{ width: 130 }}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input
          placeholder="请输入关键字"
          style={{ width: "200px", marginLeft: "10px", marginRight: "15px" }}
          ref={this.searchRef}
        />
        <Button type="primary" onClick={() => this.search(0)}>
          搜索
        </Button>
      </span>
    );
    const extra = (
      <span>
        <Button type="primary" icon={<EditFilled />} onClick={this.addProduct}>
          添加
        </Button>
      </span>
    );
    return (
      <Card title={title} extra={extra} className="productList">
        <Table
          columns={this.columns}
          dataSource={products}
          rowKey="_id"
          pagination={{
            defaultPageSize: limit,
            total: count,
            showQuickJumper: true,
            hideOnSinglePage: true,
            onChange: this.pageChange,
          }}
        ></Table>
      </Card>
    );
  }
}
