import {
  FIND_CUSTOMERS_REQUEST,
  FIND_CUSTOMERS_SUCCESS,
  FIND_CUSTOMERS_FAILURE,
} from "./ActionTypes";

const initialState = {
  loading: false,
  customers: [],
  error: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_CUSTOMERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, customers: action.payload };

    case FIND_CUSTOMERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default customerReducer;
