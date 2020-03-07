import axios from 'axios';
import * as constant from 'src/constant';

export const getProfit = (from, to) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.BETTING_HISTORY_REQUEST
  });
  const data = {
    from: from,
    to: to
  }
  await axios.post(`${constant.API_URL}/bet`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`
    }
  })
  .then(res => {
    if (res.data) {
      dispatch({
        type: constant.BETTING_HISTORY_REQUEST_SUCCESS,
        data: res.data
      });
    } else {
      dispatch({
        type: constant.BETTING_HISTORY_REQUEST_FAILED,
        error: res.data.message
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.BETTING_HISTORY_REQUEST_FAILED,
      error: error.response.statusText
    });
  });
}
