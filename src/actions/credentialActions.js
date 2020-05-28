import axios from 'axios';
import * as constant from 'src/constant';

export const getCredentials = (userId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.CREDENTIAL_REQUEST
  });
  const params = userId >= 0 ? `?userId=${userId}` : '';
  await axios.get(`${constant.API_URL}/credential${params}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.CREDENTIAL_GET_REQUEST_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: constant.CREDENTIAL_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.CREDENTIAL_REQUEST_FAILED
      });
    });
};

export const addCredential = (bookmaker, country, bookmakerUsername, password, currency) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.CREDENTIAL_REQUEST
  });
  const data = {
    bookmaker,
    country,
    bookmakerUsername,
    password,
    currency
  };
  await axios.post(`${constant.API_URL}/credential`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        const message = `${userData.surname} ${userData.firstname} added a new bookieaccount - "${res.data.bookmakerUsername}"`;
        window.$client.updateBookieaccount({ userId: userData.id, message });
        dispatch({
          type: constant.CREDENTIAL_ADD_REQUEST_SUCCESS,
          credential: res.data
        });
      } else {
        dispatch({
          type: constant.CREDENTIAL_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.CREDENTIAL_REQUEST_FAILED
      });
    });
};

export const updateCredential = (bookmaker, country, bookmakerUsername, password, currency, id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.CREDENTIAL_REQUEST
  });
  const data = {
    bookmaker,
    country,
    bookmakerUsername,
    password,
    currency
  };
  await axios.put(`${constant.API_URL}/credential/${id}`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        const message = `${userData.surname} ${userData.firstname} updated bookieaccount - "${res.data.bookmakerUsername}"`;
        window.$client.updateBookieaccount({ userId: userData.id, message });
        dispatch({
          type: constant.CREDENTIAL_UPDATE_REQUEST_SUCCESS,
          credential: res.data
        });
      } else {
        dispatch({
          type: constant.CREDENTIAL_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.CREDENTIAL_REQUEST_FAILED
      });
    });
};

export const deleteCredential = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.CREDENTIAL_REQUEST
  });
  await axios.delete(`${constant.API_URL}/credential/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        const message = `${userData.surname} ${userData.firstname} deleted bookieaccount - "${res.data.bookmakerUsername}"`;
        window.$client.updateBookieaccount({ userId: userData.id, message });
        dispatch({
          type: constant.CREDENTIAL_DELETE_REQUEST_SUCCESS,
          credential: res.data
        });
      } else {
        dispatch({
          type: constant.CREDENTIAL_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.CREDENTIAL_REQUEST_FAILED
      });
    });
};
