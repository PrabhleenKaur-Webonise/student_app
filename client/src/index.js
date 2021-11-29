import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { login } from "./login";

// const routes = (
//   <BrowserRouter>
//     <Routes>
//       {/* <Switch> */}
//       <Route exact path="/login" component={login} />
//       <Route exact path="/" component={App} />
//       <Route render={() => <h1>Page Not Found</h1>} />
//       {/* </Switch> */}
//     </Routes>
//   </BrowserRouter>
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* {routes} */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
