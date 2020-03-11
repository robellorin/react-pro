import * as constant from 'src/constant';

const initialState = {
  loading: true,
  data: {},
  error: '',
  checkNews: false
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.BETTING_HISTORY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constant.BETTING_HISTORY_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data
      };
    }

    case constant.BETTING_HISTORY_REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }

    case constant.CHECKING_NEWS: {
      return {
        ...state,
        checkNews: action.payload
      };
    }
    
    default: {
      return state;
    }
  }
};

export default paymentReducer;
