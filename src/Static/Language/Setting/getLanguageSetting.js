import localeData from "./localeData";

// 获取语言设置的函数
const getLanguageSetting = (lang) => {
  let language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

  let languageSplitRegionCodeCode = language.split(/[_-]+/);
  let languageWithUpperRegionCodeCode = "";

  if (languageSplitRegionCodeCode[1]) {
    // 将地区代码转换为大写，并用连字符连接
    languageSplitRegionCodeCode[1] = languageSplitRegionCodeCode[1].toUpperCase();
    languageWithUpperRegionCodeCode = languageSplitRegionCodeCode.join("-");
  } else {
    // 如果没有地区代码，默认为 "zh-TW"
    if (languageSplitRegionCodeCode[0] === "zh") {
      languageWithUpperRegionCodeCode = "zh-TW";
    }
  }

  let messages =
    localeData[languageWithUpperRegionCodeCode] || 
    localeData[language] 

  if (lang != null) {
    if (lang === "Browser Language") {
      localStorage.setItem("locale", "Browser Language");
      return {
        locale: language,
        messages: messages,
        languageSetting: "Browser Language",
      };
    } else {
      messages = localeData[lang.replace("_", "-")] ;
      localStorage.setItem("locale", lang.replace("_", "-"));
      return {
        locale: lang.replace("_", "-"),
        messages: messages,
        languageSetting: lang,
      };
    }
  } else {
    return {
      locale: language,
      messages: messages,
      languageSetting: "Browser Language",
    };
  }
};

export default getLanguageSetting;
