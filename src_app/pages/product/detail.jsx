import React, { Component } from "react";
import { Card, List } from "antd";
import { LeftCircleTwoTone, ArrowRightOutlined } from "@ant-design/icons";
import { getCategory } from "../../api/product";
import { BASE_URL } from "../../config";
const Item = List.Item;

/*
Product的详情子路由组件
 */
export default class detail extends Component {
  state = {
    cateArr: [],
  };

  async componentDidMount() {
    const { categoryId } = this.props.location.state.product;
    let { cateArr } = await getCategory(categoryId);
    cateArr = cateArr ? cateArr : [];
    this.setState({ cateArr });
  }
  onPreview = (image) => {
    window.open(BASE_URL + image);
  };
  render() {
    // 读取携带过来的state数据
    const { name, desc, price, images } = this.props.location.state.product;
    const { cateArr } = this.state;
    console.log(cateArr);
    const title = (
      <span>
        <LeftCircleTwoTone
          style={{ fontSize: "30px", marginRight: "15px" }}
          onClick={() => this.props.history.goBack()}
        />
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List itemLayout="vertical" size="large">
          <Item>
            <h2>商品名称:</h2>
            <span>{name}</span>
          </Item>
          <Item>
            <h2>商品描述:</h2>
            <span>{desc}</span>
          </Item>
          <Item>
            <h2>商品价格:</h2>
            <span>{price}元</span>
          </Item>
          <Item>
            <h2>所属分类:</h2>
            <span>
              {cateArr.map((cate, i) => {
                if (i < cateArr.length - 1) {
                  return (
                    <span key={cate._id}>
                      <span>{cate.name}</span>
                      <ArrowRightOutlined
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      />
                    </span>
                  );
                } else return <span key={cate._id}>{cate.name}</span>;
              })}
            </span>
          </Item>
          <Item>
            <h2>商品图片:</h2>
            <div>
              {images.map((image) => (
                <img
                  onClick={() => this.onPreview(image)}
                  key={image}
                  src={BASE_URL + image}
                  className="product-image"
                  alt="product-img"
                  style={{
                    width: "200px",
                    cursor: "pointer",
                    marginRight: "20px",
                  }}
                />
              ))}
            </div>
          </Item>
        </List>
      </Card>
    );
  }
}
