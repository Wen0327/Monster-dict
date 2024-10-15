
import getLanguageSetting from '../Static/Language/Setting/getLanguageSetting'
import Constants from '../Constants/Constants'

const actionType = Constants.ActionType

export const signOut = () => {
	localStorage.removeItem("api_key")
	return ((dispatch) => {
		dispatch({ type: actionType.INIT_USER })
	})
}

export const changeLanguage = (language) => {
	return {
		type: actionType.CHANGE_LANGUAGE,
		payload: getLanguageSetting(language)
	}
}


