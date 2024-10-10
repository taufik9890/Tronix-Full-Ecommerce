import { Table, Modal, Form, Input, Button, Alert } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [msg, setMsg] = useState("");
  const userInfo = useSelector((state) => state.user.value);

  const showModal = (record) => {
    setIsModalOpen(true);
    setInitialValues([
      {
        name: ["name"],
        value: record.name,
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
    async function viewCategory() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/allcategory"
      );

      let categoryData = [];
      data.map((item) => {
        categoryData.push({
          key: item._id,
          name: item.name,
          status: item.status,
        });
      });
      setCategoryList(categoryData);
    }
    viewCategory();
  }, [refetch]);

  const handleApprove = async (render) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/approvecategory",
      {
        id: render.key,
        status: render.status,
      }
    );
    setRefetch(!refetch);
    setMsg(data);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/product/deletecategory/${id}`
    );
    setRefetch(!refetch);
    setMsg(data);
  };

  const onFinish = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/product/editcategory",
      {
        oldname: initialValues[0].value,
        name: values.name,
      }
    );
    setIsModalOpen(false);
    setRefetch(!refetch);
    setMsg(data);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
    userInfo.role != "User" && (
      <>
        <Table dataSource={categoryList} columns={columns} />
        {(msg && msg.success && (
          <Alert message={msg.success} type="success" />
        )) ||
          (msg.error && <Alert message={msg.error} type="error" />)}
      </>
    )
  );
};

export default ViewCategory;
