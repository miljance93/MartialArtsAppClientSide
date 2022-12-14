import ReactDOM from "react-dom/client";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Router } from "react-router-dom";
import App from "./app/layout/App";
import { store, StoreContext } from "./app/stores/store";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    {/*Mora da se refreshuje stranica. Sa BrowserRouter ne mora!*/}
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
