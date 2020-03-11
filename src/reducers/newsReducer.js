import * as constant from 'src/constant';

const initialState = {
  loading: true,
  news: [],
  status: 'success'
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.NEWS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constant.NEWS_GET_REQUEST_SUCCESS: {
      return {
        ...initialState,
        loading: false,
        news: action.data,
        status: 'success'
      };
    }

    case constant.NEWS_ADD_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        news: [...state.news, action.news],
        status: 'success'
      };
    }

    case constant.NEWS_UPDATE_REQUEST_SUCCESS: {
      let clone = state.news;
      clone.map(item => {
        if (item.id === action.news.id) {
          item.news = action.news.news;
        }
        return item;
      })
      
      return {
        ...state,
        loading: false,
        news: clone,
        status: 'success'
      };
    }

    case constant.NEWS_DELETE_REQUEST_SUCCESS: {
      const clone = state.news.filter(item => item.id !== action.news.id);
      return {
        ...state,
        loading: false,
        news: clone,
        status: 'success'
      };
    }

    case constant.NEWS_REQUEST_FAILED: {
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

export default newsReducer;
