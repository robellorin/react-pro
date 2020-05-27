import axios from 'axios';
import * as constant from 'src/constant';

export const getTickets = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });

  await axios.get(`${constant.API_URL}/ticket`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.TICKET_GET_REQUEST_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: constant.TICKET_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    });
};

export const createTicket = (title) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });
  const data = {
    title
  };

  await axios.post(`${constant.API_URL}/ticket`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
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
    .catch((error) => {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    });
};

export const updateTicket = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });

  await axios.put(`${constant.API_URL}/ticket/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.TICKET_UPDATE_REQUEST_SUCCESS,
          ticketId: id
        });
      } else {
        dispatch({
          type: constant.TICKET_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    });
};

export const deleteTicket = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.TICKET_REQUEST
  });
  await axios.delete(`${constant.API_URL}/tickets/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
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
    .catch((error) => {
      dispatch({
        type: constant.TICKET_REQUEST_FAILED
      });
    });
};

export const getMessages = (ticketId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.MESSAGE_REQUEST
  });

  await axios.get(`${constant.API_URL}/message/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.MESSAGE_GET_REQUEST_SUCCESS,
          data: res.data,
          ticketId
        });
      } else {
        dispatch({
          type: constant.MESSAGE_REQUEST_FAILED
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.MESSAGE_REQUEST_FAILED
      });
    });
};

export const createMessage = (ticketId, contents) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  dispatch({
    type: constant.MESSAGE_REQUEST
  });

  const data = {
    contents
  };
  await axios.post(`${constant.API_URL}/message/${ticketId}`, data, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: constant.MESSAGE_SEND_REQUEST_SUCCESS,
          message: res.data
        });
      } else {
        dispatch({
          type: constant.MESSAGE_REQUEST_FAILED,
          error: res.data.message ? res.data.message : 'error'
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: constant.MESSAGE_REQUEST_FAILED,
        error: 'error'
      });
    });
};
