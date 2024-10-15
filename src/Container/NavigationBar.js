import React from "react";
import { Layout, Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import luciferLogo from '../Static/Images/luficer.png';
import styled from "styled-components";

const { Header } = Layout;

const Item = Menu.Item;

const NavigationItem = styled.div`
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const NavigationBar = () => {
  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "0 50px" }}>
        {/* 左侧 logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={luciferLogo}
            alt="logo"
            style={{ height: "40px", marginRight: "20px" }}
          />
          {/* 导航菜单 */}
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Item key="1">圖鑑</Item>
            <Item key="2">非限定</Item>
          </Menu>
        </div>

      </Header>
    </Layout>
  );
};

export default NavigationBar;
