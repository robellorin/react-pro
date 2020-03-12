import axios from 'axios';
import * as constant from 'src/constant';
import mokupData from './ticketMokup.json';

export const getTickets = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });
  // console.log(mokupData.tickets)
  setTimeout(() => {
    dispatch({
      type: constant.TICKET_GET_REQUEST_SUCCESS,
      data: mokupData.tickets
    });
  }, 300)
  
  // await axios.get(`${constant.API_URL}/tickets`, {
  //   headers: {
  //     'Authorization': `Bearer ${userData.token}`
  //   }
  // })
  // .then(res => {
  //   if (res.status === 200) {
  //     dispatch({
  //       type: constant.TICKET_GET_REQUEST_SUCCESS,
  //       data: res.data
  //     });
  //   } else {
  //     dispatch({
  //       type: constant.TICKET_REQUEST_FAILED
  //     });
  //   }
  // })
  // .catch(error => {
  //   dispatch({
  //     type: constant.TICKET_REQUEST_FAILED
  //   });
  // });
}

export const createTicket = (userId, title) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });
  const data = {
    userId,
    title
  }
  
  await axios.post(`${constant.API_URL}/tickets`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: constant.TICKET_ADD_REQUEST_SUCCESS,
        ticket: res.data
      });
    } else {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.TICKET_REQUEST_FAILED
    });
  });
}

export const updateTicket = (id, status) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });
  const data = {
    status
  }
  await axios.put(`${constant.API_URL}/tickets/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: constant.TICKET_UPDATE_REQUEST_SUCCESS,
        ticket: res.data
      });
    } else {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.TICKET_REQUEST_FAILED
    });
  });
}

export const deleteTicket = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });
  await axios.delete(`${constant.API_URL}/tickets/${id}`, {
    headers: {
      'Authorization': `Bearer ${userData.token}`
    }
  })
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: constant.TICKET_DELETE_REQUEST_SUCCESS,
        ticket: res.data
      });
    } else {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    }
  })
  .catch(error => {
    dispatch({
      type: constant.TICKET_REQUEST_FAILED
    });
  });
}

export const getMessages = (ticketId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.MESSAGE_REQUEST
  });
  setTimeout(() => {
    dispatch({
      type: constant.MESSAGE_GET_REQUEST_SUCCESS,
      data: mokupData.messages.filter(item => item.ticketId.toString() === ticketId.toString())
    });
  }, 300);
  // await axios.get(`${constant.API_URL}/messages`, {
  //   headers: {
  //     'Authorization': `Bearer ${userData.token}`
  //   }
  // })
  // .then(res => {
  //   if (res.status === 200) {
  //     dispatch({
  //       type: constant.MESSAGE_GET_REQUEST_SUCCESS,
  //       data: res.data
  //     });
  //   } else {
  //     dispatch({
  //       type: constant.MESSAGE_REQUEST_FAILED
  //     });
  //   }
  // })
  // .catch(error => {
  //   dispatch({
  //     type: constant.MESSAGE_REQUEST_FAILED
  //   });
  // });
}

export const createMessage = (ticketId, receiverId, content, id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.MESSAGE_REQUEST
  });
  const message = {
    "id": 6,
    "userId": id + 1,
    ticketId,
    content
  }

  setTimeout(() => {
    dispatch({
      type: constant.MESSAGE_SEND_REQUEST_SUCCESS,
      message: message
    });
  }, 300);
  const data = {
    userId: receiverId,
    ticketId,
    content
  }
  // await axios.post(`${constant.API_URL}/message`, data, {
  //   headers: {
  //     'Authorization': `Bearer ${userData.token}`,
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(res => {
  //   if (res.status === 200) {
  //     dispatch({
  //       type: constant.MESSAGE_SEND_REQUEST_SUCCESS,
  //       message: res.data
  //     });
  //   } else {
  //     dispatch({
  //       type: constant.MESSAGE_REQUEST_FAILED
  //     });
  //   }
  // })
  // .catch(error => {
  //   dispatch({
  //     type: constant.MESSAGE_REQUEST_FAILED
  //   });
  // });
}
