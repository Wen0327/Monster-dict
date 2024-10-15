import localeData from "./localeData";

const getLanguageSetting = (lang) => {
  let language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguages[0];

  let languageSplitRegionCodeCode = language.split(/[_-]+/);
  let languageWithUpperRegionCodeCode = "";
  
  if (languageSplitRegionCodeCode[1]) {
    // if language is this type "zh-tw"/"zh-TW", modify it as "zh-TW" for zh_tw.json use
    languageSplitRegionCodeCode[1] = languageSplitRegionCodeCode[1].toUpperCase();
    languageWithUpperRegionCodeCode = languageSplitRegionCodeCode.join("-");
  } else {
    // if language only has region code like "zh", set region language for localeData
    switch (languageSplitRegionCodeCode[0]) {
      case "zh":
        languageWithUpperRegionCodeCode = "zh-TW";
        break;
      default:
        break;
    }
  }

  let messages =
    localeData[language] ||
    localeData[languageWithUpperRegionCodeCode] || 
    localeData.EN;

  if (lang != null) {
    if (lang === "Browser Language") {
      localStorage.setItem("locale", "Browser Language");
      return {
        locale: language,
        messages: messages,
        languageSetting: "Browser Language",
      };
    } else {
      messages = localeData[lang] || localeData.EN;

      localStorage.setItem("locale", `${lang}`);
      return {
        locale: lang,
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
