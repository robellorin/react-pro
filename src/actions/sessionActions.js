import axios from 'axios';
import * as constant from 'src/constant';

export const login = (data) => async (dispatch) => {
  dispatch({
    type: constant.SESSION_LOGIN_REQUEST
  });
  await axios.post(`${constant.API_URL}/auth/signin`, data, {
    header: {
      'Content-Type': 'application/json'      
    }
  })
  .then(res => {
    console.log(res)
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data.userData));
      dispatch({
        type: constant.SESSION_LOGIN_SUCCESS,
        data: res.data.userData
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

export const logout = () => (dispatch) => {
  localStorage.clear('user');
  dispatch({
    type: constant.SESSION_LOGOUT
  });
}
