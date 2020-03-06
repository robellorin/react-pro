import * as constant from 'src/constant';

const initialState = {
  loggedIn: false,
  loading: false,
  error: '',
  message: '',
  user: {
    
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SESSION_REQUEST: {
      return {
        ...initialState,
        loading: true,
      };
    }

    case constant.SESSION_LOGIN_SUCCESS: {
      return {
        ...initialState,
        user: {
          ...action.data
        },
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

    case constant.SESSION_REGISTER_SUCCESS: {
      return {
        ...initialState,
        loading: false,
        message: action.message
      };
    }

    case constant.SESSION_REGISTER_FAILED: {
      return {
        loading: false,
        error: action.error
      };
    }

    case constant.SESSION_LOGOUT: {
      return {
        ...initialState
      };
    }

    case constant.SET_USER_DATA: {
      return {
        ...initialState,
        user: {
          ...action.data
        }
      };
    }

    case constant.SESSION_REQUEST_FAILED: {
      return {
        ...initialState,
        loading: false,
        error: 'Something went wrong!'
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
