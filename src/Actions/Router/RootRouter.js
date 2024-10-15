import React from "react";
import { Route, Switch } from "react-router"; 
import { HashRouter } from "react-router-dom";
import App from "./container/App";
import { hot } from "react-hot-loader/root";

const RootRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          path="/"
          render={({ history }) => <App />}  
        />
      </Switch>
    </HashRouter>
  );
};

export default hot(RootRouter);
