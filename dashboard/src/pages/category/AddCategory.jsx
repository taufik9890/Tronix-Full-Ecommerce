import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddCategory = () => {
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState({});
  const [form] = Form.useForm();
  const userInfo = useSelector((state) => state.user.value);

  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/createcategory",
      {
        name: values.category,
        avatar: image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setMsg(data);
    form.resetFields();
    setTimeout(() => {
      setMsg("");
    }, 2500);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    userInfo.role != "User" && (
      <>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your category!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
        {(msg && msg.success && (
          <Alert message={msg.success} type="success" />
        )) ||
          (msg.error && <Alert message={msg.error} type="error" />)}
      </>
    )
  );
};

export default AddCategory;
