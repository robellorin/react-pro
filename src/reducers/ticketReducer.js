import * as constant from 'src/constant';

const initialState = {
  ticketsLoading: false,
  tickets: [],
  messagesLoading: false,
  messages: [],
  status: 'success'
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.TICKET_REQUEST: {
      return {
        ...state,
        ticketsLoading: true,
      };
    }

    case constant.TICKET_GET_REQUEST_SUCCESS: {
      return {
        ...state,
        ticketsLoading: false,
        tickets: action.data,
        status: 'success'
      };
    }

    case constant.TICKET_ADD_REQUEST_SUCCESS: {
      return {
        ...state,
        ticketsLoading: false,
        tickets: [...state.tickets, action.ticket],
        status: 'success'
      };
    }

    case constant.TICKET_UPDATE_REQUEST_SUCCESS: {
      let clone = state.tickets;
      clone.map(item => {
        if (item.id === action.ticket.id) {
          item.ticket = action.ticket;
        }
        return item;
      })
      
      return {
        ...state,
        ticketsLoading: false,
        tickets: clone,
        status: 'success'
      };
    }

    case constant.TICKET_DELETE_REQUEST_SUCCESS: {
      const clone = state.tickets.filter(item => item.id !== action.ticket.id);
      return {
        ...state,
        ticketsLoading: false,
        tickets: clone,
        status: 'success'
      };
    }

    case constant.TICKET_REQUEST_FAILED: {
      return {
        ...state,
        ticketsLoading: false,
        status: 'error'
      };
    }

    case constant.MESSAGE_REQUEST: {
      return {
        ...state,
        messagesLoading: true,
      };
    }

    case constant.MESSAGE_GET_REQUEST_SUCCESS: {
      return {
        ...state,
        messagesLoading: false,
        messages: action.data,
        status: 'success'
      };
    }

    case constant.MESSAGE_SEND_REQUEST_SUCCESS: {
      return {
        ...state,
        messagesLoading: false,
        messages: [...state.messages, action.message],
        status: 'success'
      };
    }
    
    default: {
      return state;
    }
  }
};

export default ticketReducer;
