// dummy data
import { products } from '../../_dummyData/products';
import { reviews } from '../../_dummyData/reviews';

const initialState = {
  products: products, //array
  reviews: reviews,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
