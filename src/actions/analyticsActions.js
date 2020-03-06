import axios from 'axios';
import * as constant from 'src/constant';

const userData = JSON.parse(localStorage.getItem('user'));
export const getProfit = () => async (dispatch) => {
  dispatch({
    type: constant.BETTING_HISTORY_REQUEST
  });
  await axios.get(`${constant.API_URL}/betting-history`, {
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
