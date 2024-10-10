import { Alert, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddProduct = () => {
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [showSlug, setShowSlug] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  // const [subCategoryId, setSubCategoryId] = useState("");
  const [type, setType] = useState("");
  const [productType, setProductType] = useState([
    {
      value: "normal",
      label: "normal",
    },
    {
      value: "new",
      label: "new",
    },
    {
      value: "top",
      label: "top",
    },
    {
      value: "featured",
      label: "featured",
    },
    {
      value: "flash",
      label: "flash",
    },
  ]);
  const [form] = Form.useForm();

  const userInfo = useSelector((state) => state.user.value);

  const onFinish = async (values) => {
    let formData = new FormData();

    formData.append("name", values.product);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("description", description);
    formData.append("slug", values.product.split(" ").join("-").toLowerCase());
    formData.append("categoryId", categoryId);
    formData.append("productType", type);

    image.forEach((item) => formData.append("photos", item));

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/createproduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    form.resetFields();
    setMsg(data);
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

  const handleChange = async (value) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product/singlesubcategory/${value}`
    );

    let categoryData = [];
    data.map((item) => {
      categoryData.push({
        value: item._id,
        label: item.name,
      });
    });
    setSubCategoryList(categoryData);
    setCategoryId(value);
  };

  const handleImageChange = (e) => {
    let arr = Array.from(e.target.files);
    setImage(arr);
  };

  let handleProductType = (e) => {
    setType(e);
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
        >
          <Form.Item
            label="Product Name"
            name="product"
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setShowSlug(
                  e.target.value.split(" ").join("-").toLocaleLowerCase()
                )
              }
            />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[
              {
                message: "Slug",
              },
            ]}
          >
            <Input disabled placeholder={showSlug} />
          </Form.Item>

          <Form.Item
            label="Product Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Discount in taka"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Product Type">
            <Select
              style={{
                width: 120,
              }}
              onChange={handleProductType}
              options={productType}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={categoryList}
            />
          </Form.Item>
          {subCategoryList.length > 0 && (
            <Form.Item label="Sub-Category">
              <Select
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={subCategoryList}
              />
            </Form.Item>
          )}

          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              setDescription(editor.getData());
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />

          <Form.Item>
            <input type="file" onChange={handleImageChange} multiple />
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

export default AddProduct;
