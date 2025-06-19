import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { customerProductReducer } from "./customer/product/Reducer";

const rootReducers=combineReducers({
  auth:authReducer,
  product:customerProductReducer,
});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))