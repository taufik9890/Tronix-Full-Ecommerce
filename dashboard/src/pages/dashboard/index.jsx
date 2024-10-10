import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    userInfo.role != "User" &&
      getItem("Users", "sub1", <MailOutlined />, [
        getItem("Add User", "1"),
        getItem("View User", "2"),
      ]),

    userInfo.role != "User" &&
      getItem("Products", "sub2", <AppstoreOutlined />, [
        getItem("Add Product", "/dashboard/addproduct"),
        getItem("View Product", "/dashboard/viewproduct"),
        getItem("Add FlashSale", "/dashboard/addflashsale"),
      ]),
    {
      type: "divider",
    },

    userInfo.role != "User" &&
      getItem("Category", "sub3", <SettingOutlined />, [
        getItem("Add Category", "/dashboard/addcategory"),
        getItem("View Category", "/dashboard/viewcategory"),
        getItem("Add Subcategory", "/dashboard/addsubcategory"),
        getItem("View Subcategory", "/dashboard/viewsubcategory"),
      ]),

    userInfo.role != "User" &&
      getItem("Discount", "sub4", <SettingOutlined />, [
        getItem("Add Discount", "9"),
        getItem("View Discount", "10"),
      ]),

    userInfo.role == "User" &&
      getItem("My Profile", "sub5", <SettingOutlined />, [
        getItem("Purchase Details", "11"),
        getItem("Profile", "12"),
      ]),
  ];

  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Row>
        <Col span={4}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={20}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
