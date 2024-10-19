import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import {
  GlobalOutlined,
  DownOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import "../style.scss";
import { FormattedMessage } from "react-intl";
import Game from "../Components/SelectWife";
import Lottery from "../Components/Lottery";

const { Header } = Layout;
const Item = Menu.Item;

const NavigationBar = ({ switchLanguage, setGame }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DarkModeToggle = styled.div.attrs({
    darkMode: undefined,
  })`
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

    .icon {
      position: absolute;
      top: 50%;
      left: ${(props) => (props.darkMode ? "28px" : "6px")};
      transform: translateY(-50%);
      font-size: 14px;
      transition: left 0.3s ease;
    }
  `;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Item
              style={{ textAlign: "center", minWidth: "110px" }}
              key="1"
              onClick={() => setGame("game")}
            >
              <FormattedMessage id="Fave.Character" />
            </Item>

            <Item
              style={{ textAlign: "center", minWidth: "110px" }}
              key="2"
              onClick={() => setGame("lottery")}
            >
              <FormattedMessage id="Gacha.Simulator" />
            </Item>
          </Menu>
        </div>

        <div className="displayToggle">
          <Dropdown overlay={languageMenu} trigger={["click"]}>
            <Button icon={<GlobalOutlined />}>
              {!isMobile && (
                <>
                  <FormattedMessage id="Select.Language" /> <DownOutlined />
                </>
              )}
            </Button>
          </Dropdown>
          <DarkModeToggle darkMode={darkMode} onClick={toggleDarkMode}>
            {darkMode ? (
              <SunOutlined className="icon" />
            ) : (
              <MoonOutlined className="icon" />
            )}
          </DarkModeToggle>
        </div>
      </Header>
    </Layout>
  );
};

export default NavigationBar;
