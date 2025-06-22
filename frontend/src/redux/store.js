import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { customerProductReducer } from "./customer/product/Reducer";
import customerReducer from "./admin/Reducer";

const rootReducers=combineReducers({
  auth:authReducer,
  customerProducts:customerProductReducer,
  customerUsers: customerReducer,
});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))