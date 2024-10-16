import React, { useState } from "react";
import { Layout, Menu, Input, Dropdown, Button } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import luciferLogo from "../Static/Images/luficer.png";
import styled from "styled-components";
import "../style.scss";

const { Header } = Layout;

const Item = Menu.Item;

const NavigationBar = ({ switchLanguage }) => {
  const [darkMode, setDarkMode] = useState(false);

  const DarkModeToggle = styled.div`
    display: inline-block;
    position: relative;
    width: 50px;
    height: 25px;
    background-color: ${(props) => (props.darkMode ? "#333" : "#f0f0f0")};
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:before {
      content: "";
      position: absolute;
      top: 3px;
      left: ${(props) => (props.darkMode ? "25px" : "3px")};
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 50%;
      transition: left 0.3s ease;
    }
  `;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can add dark mode toggle logic here, such as adding/removing dark class
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => switchLanguage("zh-TW")}>
        繁體中文
      </Menu.Item>
      <Menu.Item key="2" onClick={() => switchLanguage("zh-CN")}>
        简体中文
      </Menu.Item>
      <Menu.Item key="3" onClick={() => switchLanguage("ja-JP")}>
        日本語
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="custom-header">
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

        {/* 右侧语言切换按钮 */}

        <div className="displayToggle">
          <Dropdown overlay={languageMenu} trigger={["click"]} >
            <Button>
              选择语言 <DownOutlined />
            </Button>
          </Dropdown>

          <DarkModeToggle
            darkMode={darkMode}
            onClick={toggleDarkMode}
          ></DarkModeToggle>
        </div>
      </Header>
    </Layout>
  );
};

export default NavigationBar;
