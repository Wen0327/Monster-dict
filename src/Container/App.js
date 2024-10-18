import React, { useState } from "react";
import { Button, Layout } from "antd";
import { IntlProvider, FormattedMessage } from "react-intl";
import localeData from "../Static/Language/Setting/localeData";
import NavigationBar from "./NavigationBar";
import Game from "../Components/Game";

const { Content } = Layout;

const App = () => {
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || "zh-TW"
  );

  const [startGame, setStartGame] = useState(false);

  const messages = localeData[locale] || localeData["zh-TW"];

  const switchLanguage = (lang) => {
    const formattedLang = lang.replace("_", "-");
    setLocale(formattedLang);
    localStorage.setItem("locale", formattedLang);
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Layout style={{ minHeight: "100dvh"  }}>
        <NavigationBar switchLanguage={switchLanguage} />
        <Content style={{ padding: "20px", textAlign: "center" }}>
          {!startGame ? (
            <Button onClick={() => setStartGame(true)}>
              <FormattedMessage id="Game.Start" />
            </Button>
          ) : (
            <Game currentLanguage={locale}/> 
          )}
        </Content>
      </Layout>
    </IntlProvider>
  );
};

export default App;
