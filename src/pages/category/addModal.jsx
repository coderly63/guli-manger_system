import { searchCategory, addGoods } from "../../api/category";
import React, { Component } from "react";
import { Form, Input, Select, Modal, message } from "antd";
const { Option } = Select;
export default class addModal extends Component {
  state = {
    goods: [],
  };
  hideModal = () => {
    this.props.hideModal();
  };
  formRef = React.createRef();
  addGoods = async () => {
    await this.formRef.current.validateFields(["name"]);
    const errors = await this.formRef.current.getFieldError("name");
    if (errors.length === 0) {
      const parentId = this.formRef.current.getFieldValue("category");
      const name = this.formRef.current.getFieldValue("name");
      const good = {
        parentId,
        name,
      };
      const res = await addGoods(good);
      if (res.status === 200) {
        message.success("添加商品成功");
        this.props.getCurrentCategory(parentId);
        this.componentDidMount();
        this.hideModal();
      } else message.warning("添加商品失败");
    }
  };
  async componentDidMount() {
    const res = await searchCategory(-1);
    this.setState({ goods: res.goods });
  }
  render() {
    const { showStatus, name } = this.props;
    const defaultKey = name[name.length - 1]._id + "";
    const { goods } = this.state;
    return (
      <div>
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addGoods}
          onCancel={this.hideModal}
          okText="确认"
          destroyOnClose={true}
          cancelText="取消"
        >
          <Form ref={this.formRef} initialValues={{ category: defaultKey }}>
            <Form.Item label="列 表" name="category">
              <Select>
                <Option value="0">一级分类列表</Option>
                {goods.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="名称"
              name="name"
              rules={[
                { required: true, message: "Please input your category name!" },
              ]}
            >
              <Input placeholder="请输入分类名称"></Input>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
