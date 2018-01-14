import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter} from "react-router-dom";
import reducer from "./reducer.js";

// import Login from "./container/login/login";
// import Register from "./container/register/register";
// import AuthRoute from "./component/authRoute/authRoute";
// import BossInfo from "./container/bossinfo/bossinfo";
// import EagleInfo from "./container/eagleInfo/eagleInfo";
// import Dashboard from "./component/dashboard/dashboard";
// import Chat from "./component/chat/chat";
import "./config";
import "./index.css";
import App from "./app";

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : ()=>{};
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  reduxDevtools
));
// 页面：boss, eagle,me,msg
ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      {/* <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/eagleinfo" component={EagleInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div> */}
      <App />
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root')
);
registerServiceWorker();

