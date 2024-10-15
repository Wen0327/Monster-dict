import Constants from '../Constants/Constants';
import getLanguageSetting from '../Static/Language/Setting/getLanguageSetting';

const actionType = Constants.ActionType;

const loadInitLanguage = () => {
  let initLocale = localStorage.getItem("locale");
  return getLanguageSetting(initLocale);
}

let initState = {
  currentLanguage: loadInitLanguage(),
}

const languageReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CHANGE_LANGUAGE:
      return {
        currentLanguage: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
