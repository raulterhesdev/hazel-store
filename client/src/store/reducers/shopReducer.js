import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_REVIEWS_START,
  FETCH_REVIEWS_ERROR,
  FETCH_REVIEWS_SUCCESS,
  UPLOAD_IMAGE_START,
  ADD_PRODUCT_START,
  EDIT_PRODUCT_START,
  DELETE_PRODUCT_START,
  UPLOAD_IMAGE_ERROR,
  ADD_PRODUCT_ERROR,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  ADD_REVIEW_START,
  ADD_REVIEW_ERROR,
  ADD_REVIEW_SUCCESS,
} from '../actionTypes';

const initialState = {
  products: [], //array
  reviews: [],
  isLoading: false,
  error: null,
  errorCode: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS_START:
    case FETCH_REVIEWS_START:
    case UPLOAD_IMAGE_START:
    case ADD_PRODUCT_START:
    case EDIT_PRODUCT_START:
    case DELETE_PRODUCT_START:
    case ADD_REVIEW_START:
      return {
        ...state,
        error: null,
        errorCode: null,
        isLoading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.data,
        isLoading: false,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: payload.data,
        isLoading: false,
      };
    case FETCH_PRODUCTS_ERROR:
    case FETCH_REVIEWS_ERROR:
    case UPLOAD_IMAGE_ERROR:
    case ADD_PRODUCT_ERROR:
    case EDIT_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case ADD_REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        errorCode: type,
        isLoading: false,
      };
    case ADD_PRODUCT_SUCCESS:
      const products = state.products;
      products.push(payload.data);
      return {
        ...state,
        products: products,
        isLoading: false,
      };
    case EDIT_PRODUCT_SUCCESS:
      const allProducts = state.products;
      const newProducts = allProducts.map((product) => {
        if (product._id === payload.data._id) {
          return payload.data;
        } else {
          return product;
        }
      });

      return {
        ...state,
        isLoading: false,
        products: newProducts,
      };
    case DELETE_PRODUCT_SUCCESS:
      const update = state.products.filter((prod) => prod._id !== payload);
      return {
        ...state,
        isLoading: false,
        products: update,
      };
    case ADD_REVIEW_SUCCESS:
      const reviews = state.reviews;
      reviews.push(payload.data);
      return {
        ...state,
        reviews: reviews,
        isLoading: false,
      };
    default:
      return state;
  }
};
