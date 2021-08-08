import React, { Component } from "react";
import { Form, Input, Modal, message } from "antd";
import { updateCategory } from "../../api/category";
export default class updateModal extends Component {
  hideModal = () => {
    this.formRef.current.resetFields([]);
    this.props.hideModal();
  };
  updateCategory = async () => {
    const errors = await this.formRef.current.getFieldError("name");
    if (errors.length === 0) {
      let { category } = this.props;
      category.name = this.formRef.current.getFieldValue("name");
      const res = await updateCategory(category);
      if (res.status === 200) {
        message.success("修改名称成功");
        this.hideModal();
      } else message.warn("修改名称失败");
    }
  };
  formRef = React.createRef();
  render() {
    const { showStatus, category } = this.props;
    return (
      <div>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form ref={this.formRef} initialValues={{ name: category.name }}>
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
