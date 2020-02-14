import * as actionTypes from 'src/actions';

const initialState = {
  loggedIn: false,
  loading: false,
  user: {
    
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN_REQUEST: {
      return {
        ...initialState,
        loading: true,
        loggedIn: false
      };
    }

    case actionTypes.SESSION_LOGIN_SUCCESS: {
      return {
        ...initialState,
        ...action.data,
        loading: false,
        loggedIn: true
      };
    }

    case actionTypes.SESSION_LOGIN_FAILED: {
      return {
        loading: false,
        loggedIn: false
      };
    }

    case actionTypes.SESSION_LOGOUT: {
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
