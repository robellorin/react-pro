import axios from 'axios';
import * as constant from 'src/constant';

export const executePayment = (id, orderId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.PAYMENT_EXECUTE_REQUEST
  });
  await axios
    .get(`${constant.API_URL}/invoice/pay?id=${id}&orderId=${orderId}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: constant.PAYMENT_EXECUTE,
          message: res.data.message
        });
      } else {
        dispatch({
          type: constant.PAYMENT_EXECUTE,
          message: res.data.message
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.PAYMENT_EXECUTE,
        message: 'failed'
      });
    });
};

export const fetchInvoices = (userId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.PAYMENT_REQUEST
  });
  let params = userId ? `?userId=${userId}` : '';

  if (userId === 0) params = `?userId=${userId}`;
  await axios.get(`${constant.API_URL}/invoice${params}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.data) {
        dispatch({
          type: constant.PAYMENT_INVOICE_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: constant.PAYMENT_INVOICE_FAILED,
          error: res.data.error
        });
      }
    })
    .catch((error) => {
    // console.log(error)
    // alert(JSON.stringify(error))
      dispatch({
        type: constant.PAYMENT_INVOICE_FAILED,
      // error: error.response.status
      });
    });
};
