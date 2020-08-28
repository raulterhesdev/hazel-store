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
  UPLOAD_IMAGE_ERROR,
} from '../actionTypes';
import { showMessage } from './uiActions';
import firebase from '../../firebase';

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
    .then((res) => {
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch(
        showMessage(
          true,
          'there was an error getting all the products. Please try again.'
        )
      );
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
    .then((res) => {
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch(
        showMessage(
          true,
          'there was an error getting all the reviews. Please try again.'
        )
      );
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

  // FIrebase
  // Create a root reference
  var storageRef = firebase.storage().ref();

  // Create a reference to 'mountains.jpg'
  var imageRef = storageRef.child(file.name);

  // Create the file metadata
  var metadata = {
    contentType: 'image/jpeg',
  };

  // upload
  var uploadTask = imageRef.put(file, metadata);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function (snapshot) {},
    function (error) {
      dispatch(showMessage(true, 'Image could not be uploaded.'));
      dispatch({ type: UPLOAD_IMAGE_ERROR, payload: error });
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
        dispatch({ type: UPLOAD_IMAGE_SUCCESS });
        dispatch({ type: ADD_PRODUCT_START });

        //request body
        const body = JSON.stringify({
          title,
          description,
          price,
          category,
          imageUrl: url,
        });

        axios
          .post('/api/products', body, config)
          .then((res) => {
            dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
            dispatch(showMessage(false, 'Product added successfully!'));
          })
          .catch((error) => {
            dispatch(showMessage(true, error.response.data.error));
            dispatch({
              type: ADD_PRODUCT_ERROR,
              payload: error.response.data.error,
            });
          });
      });
    }
  );
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
    dispatch({ type: UPLOAD_IMAGE_START });
    // FIrebase
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var imageRef = storageRef.child(file.name);

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg',
    };

    // upload
    var uploadTask = imageRef.put(file, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {},
      function (error) {
        dispatch(showMessage(true, 'Image could not be uploaded.'));
        dispatch({ type: UPLOAD_IMAGE_ERROR, payload: error });
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          dispatch({ type: UPLOAD_IMAGE_SUCCESS });
          dispatch({ type: EDIT_PRODUCT_START });

          //request body
          const body = JSON.stringify({
            title,
            description,
            price,
            category,
            imageUrl: url,
          });

          axios
            .put(`/api/products/${id}`, body, config)
            .then((res) => {
              dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: res.data });
              dispatch(showMessage(false, 'Product added successfully!'));
            })
            .catch((error) => {
              dispatch(showMessage(true, error.response.data.error));
              dispatch({
                type: EDIT_PRODUCT_ERROR,
                payload: error.response.data.error,
              });
            });
        });
      }
    );
  } else {
    //request body
    const body = JSON.stringify({
      title,
      description,
      price,
      category,
      imageUrl: imagePath,
    });
    axios
      .put(`/api/products/${id}`, body, config)
      .then((res) => {
        dispatch(showMessage(false, 'Product edited successfully!'));
        dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch(showMessage(true, error.response.data.error));
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
      dispatch(showMessage(true, 'Product deleted'));
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    })
    .catch((error) => {
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
    .then((res) => {
      dispatch(showMessage(false, 'Review Added'));
      dispatch({ type: ADD_REVIEW_SUCCESS, payload: res.data });
      dispatch(fetchProducts());
    })
    .catch((error) => {
      dispatch(
        showMessage(true, 'Only one review/product allowed for each user.')
      );
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: error.response.data.error,
      });
    });
};
