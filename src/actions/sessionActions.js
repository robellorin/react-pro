import axios from 'axios';
import * as constant from 'src/constant';


export const login = (data) => async (dispatch) => {
  dispatch({
    type: constant.SESSION_REQUEST
  });
  
  await axios.post(`${constant.API_URL}/auth/signin`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({
        type: constant.SESSION_LOGIN_SUCCESS,
        data: res.data
      });
    } else {
      dispatch({
        type: constant.SESSION_LOGIN_FAILED,
        error: res.data.message
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.SESSION_LOGIN_FAILED,
      error: error.response.data.message
    });
  });
}

export const register = (data) => async (dispatch) => {
  dispatch({
    type: constant.SESSION_REQUEST
  });
  
  await axios.post(`${constant.API_URL}/auth/signup`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: constant.SESSION_REGISTER_SUCCESS,
        message: res.data.message
      });
    } else {
      dispatch({
        type: constant.SESSION_REGISTER_FAILED,
        error: res.data.message
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.SESSION_REGISTER_FAILED,
      error: error.response.data.message
    });
  });
}

export const logout = () => (dispatch) => {
  localStorage.clear('user');
  dispatch({
    type: constant.SESSION_LOGOUT
  });
}

export const sendSignupEmailVerification = (token, history) => (dispatch) => {
  dispatch({
    type: constant.SESSION_REQUEST
  });
  axios.get(`${constant.API_URL}/auth/verify?verification=${token}`)
  .then(res => {
    if (res.status === 200) {
      history.push('/auth/login');
    } else {
      dispatch({
        type: constant.SESSION_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.SESSION_REQUEST_FAILED
    });
  });
}

export const resetPassword = (password, token, history) => (dispatch) => {
  dispatch({
    type: constant.SESSION_REQUEST
  });
  const data = {
    password
  };
  axios.post(`${constant.API_URL}/auth/resetPassword`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      history.push('/auth/login');
    } else {
      dispatch({
        type: constant.SESSION_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.SESSION_REQUEST_FAILED
    });
  });
}

export const forgotPassword = (email) => (dispatch) => {
  // dispatch({
  //   type: constant.SESSION_REQUEST
  // });
  const data = {
    email
  };
  axios.post(`${constant.API_URL}/auth/forgotPassword`, data, {
    header: {
      'Content-Type': 'application/json'
    }
  })
}
