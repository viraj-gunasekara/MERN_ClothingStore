import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./ActionTypes";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {

  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return { ...state, loading: false, error: null, products:action.payload }; //products
    
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product:action.payload }; //product

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };


      // Admin
    case CREATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
    case CREATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: [...state.products, action.payload],
        };
    case CREATE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };


    case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
    case UPDATE_PRODUCT_SUCCESS:
      
        return {
          ...state,
          loading: false,
          products: state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          ),
        };
    case UPDATE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    
    case DELETE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
    case DELETE_PRODUCT_SUCCESS:
        console.log("dlete ",state.products)
        return {
          ...state,
          loading: false,
          deleteProduct:action.payload
        };
    case DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
}