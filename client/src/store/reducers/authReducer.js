import { user } from '../../_dummyData/user';

const initialState = {
  user: { ...user },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
