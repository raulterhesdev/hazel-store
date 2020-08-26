import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from '../actionTypes';

const initialState = {
  products: [],
  totalPrice: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      // check if product is already in the cart
      let updatedProducts = state.products;
      let updatedProduct = state.products.filter(
        (prod) => prod.productId === payload._id
      )[0];
      if (updatedProduct) {
        updatedProduct.quantity += 1;
        updatedProducts = updatedProducts.map((prod) =>
          prod.productId === payload._id ? updatedProduct : prod
        );
      } else {
        updatedProducts.push({
          title: payload.title,
          productId: payload._id,
          quantity: 1,
        });
      }
      return {
        ...state,
        products: updatedProducts,
        totalPrice: state.totalPrice + payload.price,
      };
    case UPDATE_CART_ITEM:
      let updatedTotal = state.totalPrice;
      const updatedProds = state.products.map((prod) => {
        if (prod.productId === payload.id) {
          if (payload.type === 'add') {
            prod.quantity += 1;
            updatedTotal += payload.price;
          } else if (payload.type === 'dec') {
            if (prod.quantity > 0) {
              prod.quantity -= 1;
              updatedTotal -= payload.price;
            }
          }
        }
        return prod;
      });
      return {
        ...state,
        products: updatedProds,
        totalPrice: updatedTotal,
      };
    case REMOVE_PRODUCT:
      const updatedItems = state.products.filter(
        (prod) => prod.productId !== payload.id
      );
      return {
        ...state,
        products: updatedItems,
        totalPrice: state.totalPrice - payload.quantity * payload.price,
      };
    case CLEAR_CART:
      return {
        products: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};
