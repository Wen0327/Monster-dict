import React, { useState } from "react";
import { Button, Layout } from "antd";
import { IntlProvider, FormattedMessage } from "react-intl";
import localeData from "../Static/Language/Setting/localeData";
import NavigationBar from "./NavigationBar";

const App = () => {
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || "zh-TW"
  );
  const messages = localeData[locale] || localeData["zh-TW"];

  const switchLanguage = (lang) => {
    const formattedLang = lang.replace("_", "-");
    setLocale(formattedLang);
    localStorage.setItem("locale", formattedLang);
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Layout style={{ height: "100vh" }}>
        <Layout style={{ height: "100vh" }}>
        <NavigationBar/>
          <Button onClick={() => switchLanguage("en")}>English</Button>
          <Button onClick={() => switchLanguage("zh-TW")}>繁體中文</Button>
          <FormattedMessage id="welcome" />
        </Layout>
      </Layout>
    </IntlProvider>
  );
};

export default App;
