import * as constant from 'src/constant';
import axios from 'axios';

export const getNotifications = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  await axios.get(`${constant.API_URL}/notification`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.GET_NOTIFICATION,
          data: res.data
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.CREDENTIAL_REQUEST_FAILED
      });
    });
};

export const deleteNotification = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  await axios.delete(`${constant.API_URL}/notification/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.DELETE_NOTIFICATION,
          id
        });
      }
    });
};

export const deleteNotificationByType = (type) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  await axios
    .delete(`${constant.API_URL}/notification?type=${type}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.DELETE_NOTIFICATION_BY_TYPE,
          strType: type
        });
      }
    });
};
