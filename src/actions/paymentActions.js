import axios from 'axios';
import * as constant from 'src/constant';

const userData = JSON.parse(localStorage.getItem('user'));

export const executePayment = (id, paymentID, payerID) => async (dispatch) => {
  dispatch({
    type: constant.PAYMENT_EXECUTE_REQUEST
  });
  await axios.get(`${constant.API_URL}/invoice/pay?id=${id}&paymentId=${paymentID}&payerId=${payerID}`, {
    headers: {
      'Authorization': `Bearer ${userData.token}`
    }
  })
  .then(res => {
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
  .catch(error => {
    dispatch({
      type: constant.PAYMENT_EXECUTE,
      message: 'failed'
    });
  });
}

export const fetchInvoices = () => async (dispatch) => {
  dispatch({
    type: constant.PAYMENT_REQUEST
  });
  await axios.get(`${constant.API_URL}/invoice`, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
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
  .catch(error => {
    // console.log(error)
    // alert(JSON.stringify(error))
    dispatch({
      type: constant.PAYMENT_INVOICE_FAILED,
      // error: error.response.status
    });
  });
}
