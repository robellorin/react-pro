import * as constant from 'src/constant';

const initialState = {
  loggedIn: false,
  loading: false,
  error: '',
  user: {
    
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SESSION_LOGIN_REQUEST: {
      return {
        ...initialState,
        loading: true,
        loggedIn: false
      };
    }

    case constant.SESSION_LOGIN_SUCCESS: {
      return {
        ...initialState,
        ...action.data,
        loading: false,
        loggedIn: true
      };
    }

    case constant.SESSION_LOGIN_FAILED: {
      return {
        loading: false,
        loggedIn: false,
        error: action.error
      };
    }

    case constant.SESSION_LOGOUT: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
