import * as constant from 'src/constant';

const initialState = {
  loading: true,
  usersWithNews: [],
  users: [],
  status: 'success'
};

const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SUPPORT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constant.SUPPORT_GET_REQUEST_SUCCESS: {
      const clone = action.data;
      clone.map(item => {
        item.news = item.news ?? '';
        // item.newsId = action.newsId;
        return item;
      })
      return {
        ...state,
        loading: false,
        usersWithNews: action.data,
        status: 'success'
      };
    }

    case constant.SUPPORT_UPDATE_REQUEST_SUCCESS: {
      let clone = state.usersWithNews;
      clone.map(item => {
        if (item.id === action.userId) {
          item.news = action.news ?? '';
          item.newsId = action.newsId;

        }
        return item;
      })
      return {
        ...state,
        loading: false,
        usersWithNews: clone,
        status: 'success'
      };
    }

    case constant.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.data,
        loading: false
      }
    }

    case constant.SUPPORT_REQUEST_FAILED: {
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

export default supportReducer;
