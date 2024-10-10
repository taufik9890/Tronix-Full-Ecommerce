import { Alert, Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import ResendMail from "./ResendMail";
import "./style.css";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showButton, setShowButton] = useState(false);
  // const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/auth/registration",
      {
        name: values.name,
        email: values.email,
        password: values.password,
      }
    );
    setMsg(data);
    setLoading(false);
    setShowButton(data);

    setTimeout(() => {
      setMsg("");
      // navigate(`/otp/${values.email}`);
    }, 2000);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // resend mail function
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onResendMail = async (values) => {
    setIsModalOpen(false);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/resendmail",
      {
        email: values.email,
      }
    );
    console.log(data);
    if (data.success) {
      setMsg(data);
    } else if (data.error) {
      setMsg(data);
    }
    setTimeout(() => {
      setMsg(false);
    }, 3500);
  };

  const onResendFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsModalOpen(false);
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
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
          {showButton && (
            <ResendMail
              isModalOpen={isModalOpen}
              showModal={showModal}
              onResendMail={onResendMail}
              onResendFailed={onResendFailed}
            />
          )}
          <Link to="/forgotpassword">Forgot Password?</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Registration;
