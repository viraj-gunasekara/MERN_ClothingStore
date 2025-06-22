
import { api } from "../../config/apiConfig";
import {
  FIND_CUSTOMERS_REQUEST,
  FIND_CUSTOMERS_SUCCESS,
  FIND_CUSTOMERS_FAILURE,
} from "./ActionTypes";

// Fetch all customers
export const findCustomers = () => async (dispatch) => {
  dispatch({ type: FIND_CUSTOMERS_REQUEST });

  try {
    const { data } = await api.get("/api/users");
    dispatch({ type: FIND_CUSTOMERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_CUSTOMERS_FAILURE,
      payload: error.message,
    });
  }
};
