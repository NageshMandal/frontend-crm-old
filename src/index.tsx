import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { HelmetProvider } from "react-helmet-async";

const trackingScript = document.createElement("script");
trackingScript.async = true;
trackingScript.innerHTML = `
(function(w, d) {
  d.addEventListener("DOMContentLoaded", function () {
    var token = "5a97071a-8c4a-4462-916f-fc8df1ae91e4";
    var script = d.createElement('script');
    script.async = true;
    script.src = "https://track.saleshub.ai/assets/for-cache.min.js?authorization=5a97071a-8c4a-4462-916f-fc8df1ae91e4";
    script.onload = function () {
      w.salesToolsObserverCached(token);
    };
    d.body.appendChild(script);
  })
})(window, document)
`;

const chargebeeScript = document.createElement("script");
chargebeeScript.async = true;
chargebeeScript.src = "http://js.chargebee.com/v2/chargebee.js";
chargebeeScript.setAttribute("data-cb-site", "usedemand");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>
);
document.body.appendChild(trackingScript);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
