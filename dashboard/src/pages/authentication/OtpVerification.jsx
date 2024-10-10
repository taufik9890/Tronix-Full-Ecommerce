import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OtpVerification = () => {
  const [msg, setMsg] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { data } = await axios.post("http://localhost:8000/api/v1/otp", {
      email: params.email,
      otp: values.otp,
    });
    setMsg(data);
    setTimeout(() => {
      setMsg("");
      if (data.success) {
        return navigate("/login");
      }
    }, 1500);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {(msg && msg.success && <Alert message={msg.success} type="success" />) ||
        (msg.error && <Alert message={msg.error} type="error" />)}
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
          label="OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please input your otp!",
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
          <Button type="primary" htmlType="submit">
            Verify
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OtpVerification;
