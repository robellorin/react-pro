import axios from 'axios';
import * as constant from 'src/constant';

const userData = JSON.parse(localStorage.getItem('user'));
export const createPayment = () => async (dispatch) => {
  dispatch({
    type: constant.PAYMENT_REQUEST
  });
  let paymentId = "PAY-1B56960729604235TKQQIYVY";
  await axios.post(`${constant.API_URL}/payment/create`, {}, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.data) {
      dispatch({
        type: constant.PAYMENT_CREATE_SUCCESS,
        data: res.data
      });
      paymentId = res.data.id;
    } else {
      dispatch({
        type: constant.PAYMENT_CREATE_FAILED,
        error: res.data.message
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.PAYMENT_CREATE_FAILED,
      error: error.response.data.message
    });
  });
  return paymentId;
}

export const executePayment = (data) => async (dispatch) => {
  dispatch({
    type: constant.PAYMENT_REQUEST
  });
  await axios.post(`${constant.API_URL}/payment/excute`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.data) {
      dispatch({
        type: constant.PAYMENT_EXECUTE,
        status: res.status
      });
    } else {
      dispatch({
        type: constant.PAYMENT_EXECUTE,
        status: res.status
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.PAYMENT_EXECUTE,
      status: error.response.status
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
