import * as constant from 'src/constant';

const initialState = {
  isNotification: false,
  data: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SET_NOTIFICATION: {
      return {
        isNotification: action.value,
        data: action.data ? action.data : state.data
      };
    }
        
    default: {
      return state;
    }
  }
};

export default notificationReducer;
