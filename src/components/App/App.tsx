import React from "react";
import Coin from "@components/Coin";
import Coins from "@components/Coins";
import styles from "@styles/App.module.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className={`${styles.app}`}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className={styles["app__coin-list"]}>
                <Coins />
              </div>
            }
          />
          <Route path="/">
            <Route
              path=":tab"
              element={
                <div className={styles["app__coin-list"]}>
                  <Coins />
                </div>
              }
            />
          </Route>
          <Route path="/coin">
            <Route
              path=":id"
              element={
                <div className={styles["app__single-coin"]}>
                  <Coin />
                </div>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
