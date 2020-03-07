import * as constant from 'src/constant';

const initialState = {
  loading: true,
  data: {},
  error: ''
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.BETTING_HISTORY_REQUEST: {
      return {
        ...initialState,
        loading: true,
      };
    }

    case constant.BETTING_HISTORY_REQUEST_SUCCESS: {
      return {
        ...initialState,
        loading: false,
        data: action.data
      };
    }

    case constant.BETTING_HISTORY_REQUEST_FAILED: {
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
