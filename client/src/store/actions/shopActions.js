import axios from 'axios';
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_REVIEWS_ERROR,
  FETCH_REVIEWS_START,
  FETCH_REVIEWS_SUCCESS,
  ADD_PRODUCT_START,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_START,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_ERROR,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  ADD_REVIEW_START,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
} from '../actionTypes';

// Fetch Products
export const fetchProducts = () => (dispatch) => {
  // Fetch Start
  dispatch({ type: FETCH_PRODUCTS_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .get('/api/products', config)
    .then((res) =>
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data })
    )
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: FETCH_PRODUCTS_ERROR,
        payload: error.response.data.error,
      });
    });
};

// Fetch reviews
export const fetchReviews = () => (dispatch) => {
  // Fetch Start
  dispatch({ type: FETCH_REVIEWS_START });
  //headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .get('/api/reviews', config)
    .then((res) => dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: res.data }))
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: FETCH_REVIEWS_ERROR,
        payload: error.response.data.error,
      });
    });
};

//add a product
export const addProduct = ({ title, description, price, category, file }) => (
  dispatch,
  getState
) => {
  // Add Start

  dispatch({ type: UPLOAD_IMAGE_START });

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // upload file
  const formData = new FormData();
  formData.append('file', file); // appending file

  axios
    .post('/api/products/upload', formData, config)
    .then((res) => {
      dispatch({ type: UPLOAD_IMAGE_SUCCESS });
      dispatch({ type: ADD_PRODUCT_START });

      //request body
      const body = JSON.stringify({
        title,
        description,
        price,
        category,
        imageUrl: res.data.data.filePath,
      });

      axios
        .post('/api/products', body, config)
        .then((res) =>
          dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data })
        )
        .catch((error) => {
          console.log(error.response.data);
          dispatch({
            type: ADD_PRODUCT_ERROR,
            payload: error.response.data.error,
          });
        });
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch({ type: ADD_PRODUCT_ERROR, payload: error.response.data.error });
    });
};

//edit product
export const editProduct = ({
  id,
  title,
  description,
  price,
  category,
  file,
  imageUrl,
}) => (dispatch, getState) => {
  // Add Start
  dispatch({ type: EDIT_PRODUCT_START });

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // if there was another image upload it and replace the path
  let imagePath = imageUrl;
  // upload file
  if (file !== '') {
    const formData = new FormData();
    formData.append('file', file); // appending file

    axios
      .post('/api/products/upload', formData, config)
      .then((res) => {
        dispatch({ type: UPLOAD_IMAGE_SUCCESS });
        imagePath = res.data.data.filePath;

        //request body
        const body = JSON.stringify({
          title,
          description,
          price,
          category,
          imageUrl: imagePath,
        });
        console.log(body);
        axios
          .put(`/api/products/${id}`, body, config)
          .then((res) =>
            dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: res.data })
          )
          .catch((error) => {
            console.log(error.response.data);
            dispatch({
              type: EDIT_PRODUCT_ERROR,
              payload: error.response.data.error,
            });
          });
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch({
          type: EDIT_PRODUCT_ERROR,
          payload: error.response.data.error,
        });
      });
  } else {
    //request body
    const body = JSON.stringify({
      title,
      description,
      price,
      category,
      imageUrl: imagePath,
    });
    console.log(body);
    axios
      .put(`/api/products/${id}`, body, config)
      .then((res) =>
        dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: res.data })
      )
      .catch((error) => {
        console.log(error.response.data);
        dispatch({
          type: EDIT_PRODUCT_ERROR,
          payload: error.response.data.error,
        });
      });
  }
};

//delete a product
export const deleteProduct = ({ id }) => (dispatch, getState) => {
  // Add Start

  dispatch({ type: DELETE_PRODUCT_START });

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  axios
    .delete(`/api/products/${id}`, config)
    .then((res) => {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: DELETE_PRODUCT_ERROR,
        payload: error.response.data.error,
      });
    });
};

//add review
export const addReview = ({ title, text, rating, id }) => (
  dispatch,
  getState
) => {
  // Add Start
  dispatch({ type: ADD_REVIEW_START });

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getState().auth.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  //request body
  const body = JSON.stringify({
    title,
    text,
    rating,
  });

  axios
    .post(`/api/products/${id}/reviews`, body, config)
    .then((res) => dispatch({ type: ADD_REVIEW_SUCCESS, payload: res.data }))
    .catch((error) => {
      console.log(error.response.data);
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: error.response.data.error,
      });
    });
};
