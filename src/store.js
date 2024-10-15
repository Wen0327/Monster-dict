import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/rootReducer'; // 假設你的 reducers 文件在這裡

const store = configureStore({
  reducer: rootReducer, // 這裡傳入你的 rootReducer

});

export default store;
