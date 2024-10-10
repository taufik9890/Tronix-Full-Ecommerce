import { Alert, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddSubCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState({});
  const [msg, setMsg] = useState("");
  const [form] = Form.useForm();
  const userInfo = useSelector((state) => state.user.value);

  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/createsubcategory",
      {
        name: values.subcategory,
        avatar: image,
        categoryId: categoryId,
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

  useEffect(() => {
    async function viewCategory() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/allcategory"
      );

      let categoryData = [];
      data.map((item) => {
        categoryData.push({
          value: item._id,
          label: item.name,
        });
      });
      setCategoryList(categoryData);
    }
    viewCategory();
  }, []);

  const handleChange = (value) => {
    setCategoryId(value);
  };
  return (
    userInfo.role != "User" && (
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
          form={form}
        >
          <Form.Item>
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={categoryList}
            />
          </Form.Item>
          <Form.Item
            label="Sub-Category Name"
            name="subcategory"
            rules={[
              {
                required: true,
                message: "Please input your subcategory!",
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

export default AddSubCategory;
