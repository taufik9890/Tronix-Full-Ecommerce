import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/forgotpassword",
      {
        email: values.email,
      }
    );
    setMsg(data);
    setTimeout(() => {
      setMsg(false);
      setLoading(false);
    }, 3500);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {(msg && msg.success && <Alert message={msg.success} type="success" />) ||
        (msg.error && <Alert message={msg.error} type="error" />)}
    </>
  );
};

export default ForgetPassword;
