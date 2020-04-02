import * as constant from 'src/constant';

const initialState = {
  isNotification: false,
  data: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.GET_NOTIFICATION: {
      return {
        isNotification: action.data.length > 0,
        data: action.data
      };
    }

    case constant.DELETE_NOTIFICATION: {
      const clone = state.data.filter(item => item.id !== action.data.id);
      return {
        isNotification: clone.length > 0,
        data: clone
      };
    }
       
    default: {
      return state;
    }
  }
};

export default notificationReducer;
