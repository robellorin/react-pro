import * as constant from 'src/constant';

const initialState = {
  loading: true,
  credentials: [],
  status: 'success'
};

const credentialReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.CREDENTIAL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constant.CREDENTIAL_GET_REQUEST_SUCCESS: {
      return {
        ...initialState,
        loading: false,
        credentials: action.data,
        status: 'success'
      };
    }

    case constant.CREDENTIAL_ADD_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        credentials: [...state.credentials, action.credential],
        status: 'success'
      };
    }

    case constant.CREDENTIAL_UPDATE_REQUEST_SUCCESS: {
      let clone = state.credentials;
      clone.map(item => {
        if (item.id === action.credential.id) {
          item.bookmaker = action.credential.bookmaker;
          item.bookmakerUsername = action.credential.bookmakerUsername;
          item.password = action.credential.password;
        }
        return item;
      })
      
      return {
        ...state,
        loading: false,
        credentials: clone,
        status: 'success'
      };
    }

    case constant.CREDENTIAL_DELETE_REQUEST_SUCCESS: {
      const clone = state.credentials.filter(item => item.id !== action.credential.id);
      return {
        ...state,
        loading: false,
        credentials: clone,
        status: 'success'
      };
    }

    case constant.CREDENTIAL_REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
        status: 'error'
      };
    }
    
    default: {
      return state;
    }
  }
};

export default credentialReducer;
