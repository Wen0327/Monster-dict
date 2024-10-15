import React from "react";
import { Layout } from "antd";
import { FormattedMessage } from "react-intl";

const App = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout style={{ height: "100vh" }}>

        <FormattedMessage id="welcome"/>
      </Layout>
    </Layout>
  );
};

export default App;
