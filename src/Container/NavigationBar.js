import React from "react";
import { Layout, Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import luciferLogo from '../Static/Images/luficer.png';

const { Header } = Layout;

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
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">排行榜</Menu.Item>
            <Menu.Item key="3">发现</Menu.Item>
            <Menu.Item key="4">WIKI</Menu.Item>
            <Menu.Item key="5">大会员礼包</Menu.Item>
            <Menu.Item key="6">充值中心</Menu.Item>
            <Menu.Item key="7">我的</Menu.Item>
          </Menu>
        </div>

        {/* 右侧搜索框 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="搜索游戏&WIKI"
            prefix={<SearchOutlined />}
            style={{ width: 300, borderRadius: "20px" }}
          />
          <img
            src="https://yourprofileicon.com/icon.png" // 替换为你的用户图标链接
            alt="user-icon"
            style={{ height: "40px", marginLeft: "20px", borderRadius: "50%" }}
          />
        </div>
      </Header>
    </Layout>
  );
};

export default NavigationBar;
