import React from "react";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// config redux
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configStore from "./redux/configStore";

const store = configStore();

function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
}

export default AppProvider;
