import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button, Upload, message } from "antd";
import { searchCategory } from "../../api/category";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { uploadFiles } from "../../api/product";
import { BASE_URL } from "../../config";
export default class add extends Component {
  state = {
    options: [],
    fileList: [],
    product: {},
  };
  validatePrice(rule, value) {
    value = value * 1;
    return new Promise(async (resolve, reject) => {
      if (value <= 0) {
        await reject("价格不能为负数");
      } else {
        await resolve();
      }
    });
  }
  submit = async (values) => {
    const { fileList } = this.state;
    const product = new FormData();
    fileList.forEach((file) => {
      product.append("images", file.originFileObj);
    });
    for (let i in values) {
      product.append(i, values[i]);
    }
    const res = await uploadFiles(product);
    if (res.status === 200) {
      message.success("上传成功");
      this.props.history.goBack();
    } else message.error("上传失败");
  };
  getLower = async (selectedOptions) => {
    console.log(selectedOptions);
    const targetOption = await selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const { goods } = await searchCategory(targetOption.value);
    console.log(goods);
    targetOption.loading = false;
    if (goods && goods.length > 0) {
      targetOption.children = goods.map((good) => ({
        value: good._id,
        label: good.name,
        isLeaf: false,
      }));
    } else targetOption.isLeaf = true;
  };
  async componentDidMount() {
    this.initProduct();
    this.initOptions();
    this.initFileList();
  }
  formRef = React.createRef();
  async initOptions() {
    const { goods } = await searchCategory(0);
    const options = goods.map((good) => ({
      value: good._id,
      label: good.name,
      isLeaf: false,
    }));
    this.setState({ options });
  }
  initFileList() {
    const product = this.props.location.state
      ? this.props.location.state.product
      : {};
    let fileList =
      product.images &&
      product.images.map((image, index) => {
        return {
          uid: -index,
          name: image,
          status: document,
          url: BASE_URL + image,
        };
      });
    this.setState({ fileList });
  }
  async initProduct() {
    //获取一级分类列表
    const product = this.props.location.state
      ? this.props.location.state.product
      : {};
    this.setState({ product });
    let cateIdArr = product.categoryId && product.categoryId.split(",");
    this.formRef.current.setFieldsValue({
      name: product.name,
      price: product.price,
      desc: product.desc,
      categoryId: cateIdArr,
    });
  }
  onChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  render() {
    const title = (
      <div style={{ lineHeight: "30px" }}>
        <LeftCircleTwoTone
          style={{ fontSize: "30px", marginRight: "15px" }}
          onClick={() => this.props.history.goBack()}
        />
        <span style={{ position: "relative", top: "-4px" }}>添加商品</span>
      </div>
    );
    const { options, fileList, product } = this.state;
    return (
      <div className="add">
        <Card title={title}>
          <Form
            style={{ width: "500px" }}
            onFinish={this.submit}
            ref={this.formRef}
            initialValues={product}
          >
            <Form.Item
              name="name"
              label="商品名称"
              rules={[{ required: true, message: "请输入商品名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="desc"
              label="商品描述"
              rules={[{ required: true, message: "请输入商品描述" }]}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 10 }} />
            </Form.Item>
            <Form.Item
              name="price"
              label="商品价格"
              rules={[
                { required: true, message: "请输入商品价格" },
                { validator: this.validatePrice },
              ]}
            >
              <Input addonAfter="元" />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="商品分类"
              rules={[{ required: true, message: "请输入商品分类" }]}
            >
              <Cascader
                options={options}
                loadData={this.getLower}
                changeOnSelect
              />
            </Form.Item>
            <Form.Item label="上传图片">
              <Upload
                listType="picture-card"
                accept="image/*"
                fileList={fileList}
                onChange={this.onChange}
                onPreview={this.onPreview}
                beforeUpload={() => false}
                maxCount={2}
              >
                {fileList && fileList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
