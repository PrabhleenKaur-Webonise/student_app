import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Registration from "./components/registration";
import Viewer from "./components/viewer";

const routes = (
  <BrowserRouter>
    <Routes>
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/" element={<App />} />
      <Route path="/viewer" element={<Viewer />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {routes}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
