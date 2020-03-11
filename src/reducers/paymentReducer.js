import * as constant from 'src/constant';

const initialState = {
  loading: false,
  payLoading: false,
  message: '',
  invoices: []
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.PAYMENT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constant.PAYMENT_EXECUTE_REQUEST: {
      return {
        ...state,
        payLoading: true,
      };
    }
       
    case constant.PAYMENT_EXECUTE: {
      return {
        ...state,
        message: action.message,
        payLoading: false
      };
    }

    case constant.PAYMENT_INVOICE_SUCCESS: {
      return {
        ...initialState,
        invoices: action.data,
        loading: false
      };
    }

    case constant.PAYMENT_INVOICE_FAILED: {
      return {
        ...initialState,
        loading: false,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
};

export default paymentReducer;
