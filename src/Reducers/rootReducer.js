import { combineReducers } from '@reduxjs/toolkit';
import languageReducer from './language'; 
// import userReducer from './userReducer'; 


const rootReducer = combineReducers({
  language: languageReducer, 
//   user: userReducer,
 
});

export default rootReducer;
