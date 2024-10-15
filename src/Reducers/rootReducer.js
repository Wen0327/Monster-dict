import { combineReducers } from '@reduxjs/toolkit';
import languageReducer from '../Reducers/language'; 
// import userReducer from './userReducer'; 

// 將所有的 reducer 組合在一起
const rootReducer = combineReducers({
  language: languageReducer, 
//   user: userReducer,
 
});

export default rootReducer;
