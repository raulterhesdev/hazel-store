// dummy data
import { products } from '../../_dummyData/products';

const initialState = {
  products: products, //array
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
