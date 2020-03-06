import * as constant from 'src/constant';

const initialState = {
  loading: false,
  isCreated: false,
  status: '',
  invoices: []
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.PAYMENT_REQUEST: {
      return {
        ...initialState,
        loading: true,
      };
    }

    case constant.PAYMENT_CREATE_SUCCESS: {
      return {
        ...initialState,
        isCreated: true,
        loading: false
      };
    }

    case constant.PAYMENT_CREATE_FAILED: {
      return {
        ...initialState,
        isCreated: false,
        loading: false
      };
    }
    
    case constant.PAYMENT_EXECUTE: {
      return {
        ...initialState,
        status: action.status
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
