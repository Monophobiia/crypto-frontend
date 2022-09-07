import React from "react";
import routes from "@config/routes";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from "react-router-dom";
import styles from "./App.module.scss";

const App = () => {
  const RouteProvider = () => {
    return useRoutes(routes);
  };

  return (
    <div className={`${styles.app}`}>
      {/* <BrowserRouter> */}
      <RouteProvider />
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
