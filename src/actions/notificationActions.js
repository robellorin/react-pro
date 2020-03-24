import * as constant from 'src/constant';

export const setNotification = (value, data = null) => async (dispatch) => {
  dispatch({
    type: constant.SET_NOTIFICATION, value, data
  });
}
