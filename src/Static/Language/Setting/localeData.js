import en from "../en.json"
import zh_TW from "../zh_tw.json"
import zh_CN from "../zh_cn.json"
import ja_JP from "../ja_JP.json";

const localeData = { ...zh_TW,...en,...zh_CN, ...ja_JP};

export default localeData