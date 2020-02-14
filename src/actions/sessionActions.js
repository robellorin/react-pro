import axios from 'src/utils/axios';
export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAILED = 'SESSION_LOGIN_FAILED';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const login = (data) => async (dispatch) => {
  dispatch({
    type: SESSION_LOGIN_REQUEST
    });
  const res = await axios.post('/api/login', data);
  if (res.data.userData) {
    localStorage.setItem('user', JSON.stringify(res.data.userData));
    dispatch({
      type: SESSION_LOGIN_SUCCESS,
      data: res.data.userData
    });
  } else {
    dispatch({
      type: SESSION_LOGIN_FAILED
    });
  }
}

export const logout = () => (dispatch) => {
  localStorage.clear('user');
  dispatch({
  type: SESSION_LOGOUT
  });
}
