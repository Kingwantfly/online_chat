// 合并所有reducer 并且返回

import { combineReducers } from "redux";
import { user } from "./redux/user";
import { chartuser } from "./redux/chartUser";
import { chat } from "./redux/chat";

export default combineReducers({user, chartuser, chat});