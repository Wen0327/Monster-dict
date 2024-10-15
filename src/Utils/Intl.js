import React from "react";
import { connect } from "react-redux";

import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import zh_TW from "antd/lib/locale/zh_TW";
import zh_CN from "antd/lib/locale/zh_CN";
import en_US from "antd/lib/locale/en_US";
import ja_JP from "../Static/Language/i18n/ja_jp";
import App from "../Container/App.js";


const Intl = (props) => {
  const languageWithLodash = props.currentLanguage.locale
    .toLowerCase()
    .replace(/-/g, "_");

  const antdData = {
    zh_tw: zh_TW,
    zh_cn: zh_CN,
    en_us: en_US,
    ja_jp: ja_JP,
  };

  const antdLocalData = antdData[languageWithLodash] || zh_TW;

  const {currentLanguage}= props

  return (
    <IntlProvider
      locale={currentLanguage.locale}
      key={currentLanguage.locale}
      messages={currentLanguage.messages}
      defaultLocale="TW"
    >
      <ConfigProvider locale={antdLocalData}>
        <App />
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.language.currentLanguage,
  };
};

export default connect(mapStateToProps)(Intl);
