import React, { useState } from "react";
import { Layout } from "antd";
import { IntlProvider } from "react-intl";
import localeData from "../Static/Language/Setting/localeData";
import NavigationBar from "./NavigationBar";
import Game from "../Components/SelectWife";
import Lottery from "../Components/Lottery";

const { Content } = Layout;

const App = () => {
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || "zh-TW"
  );
  const [currentGame, setCurrentGame] = useState("game"); // 預設為 "game" 來顯示難度選擇

  const messages = localeData[locale] || localeData["zh-TW"];

  const switchLanguage = (lang) => {
    const formattedLang = lang.replace("_", "-");
    setLocale(formattedLang);
    localStorage.setItem("locale", formattedLang);
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Layout style={{ minHeight: "100dvh" }}>
        <NavigationBar switchLanguage={switchLanguage} setGame={setCurrentGame} />
        <Content style={{ padding: "20px", textAlign: "center" }}>
          {currentGame === "game" && <Game currentLanguage={locale} />}
          {currentGame === "lottery" && <Lottery currentLanguage={locale} />}
        </Content>
      </Layout>
    </IntlProvider>
  );
};

export default App;
