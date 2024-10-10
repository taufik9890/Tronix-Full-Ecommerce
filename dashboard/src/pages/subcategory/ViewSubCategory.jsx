import { Alert, Button, Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewSubCategory = () => {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [initialCategory, setInitialCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [refetch, setRefetch] = useState(false);
  const [msg, setMsg] = useState("");
  const userInfo = useSelector((state) => state.user.value);

  console.log(initialCategory);

  const showModal = (record) => {
    setIsModalOpen(true);

    setInitialValues([
      {
        name: ["name"],
        value: record.name,
      },
    ]);
    setInitialCategory([
      {
        category: ["category"],
        value: record.category,
      },
    ]);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function viewSubCategory() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/allsubcategory"
      );
      let subCategoryData = [];
      data.map((item) => {
        subCategoryData.push({
          key: item._id,
          name: item.name,
          status: item.status,
          category: item?.categoryId?.name,
        });
      });
      setSubCategoryList(subCategoryData);
    }
    viewSubCategory();

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

  const handleApprove = async (render) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/approvesubcategory",
      {
        id: render.key,
        status: render.status,
      }
    );
    setMsg(data);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/product/deletesubcategory/${id}`
    );
    setMsg(data);
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/editcategory",
      {
        // oldname: initialValues[0].value,
        name: values.name,
      }
    );
    setIsModalOpen(false);
    // setRefetch(!refetch);
    setMsg(data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const handleChange = (value) => {
  //   setCategoryId(value);
  // };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <button onClick={() => handleApprove(record)}>
            {record.status === "waiting" ? "approve" : "reject"}
          </button>
          <button onClick={() => handleDelete(record.key)}>delete</button>
          <button onClick={() => showModal(record)}>Edit</button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              fields={initialValues}
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
              <Form.Item>
                <Select
                  defaultValue={record.category}
                  initialValue={record.category}
                  style={{
                    width: 120,
                  }}
                  // onChange={handleChange}
                  options={categoryList}
                />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                initialValue={record.name}
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
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Change
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      ),
    },
  ];
  return (
    <>
      {userInfo.role != "User" && (
        <Table dataSource={subCategoryList} columns={columns} />
      )}
      {(msg && msg.success && <Alert message={msg.success} type="success" />) ||
        (msg.error && <Alert message={msg.error} type="error" />)}
    </>
  );
};

export default ViewSubCategory;
