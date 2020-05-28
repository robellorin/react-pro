const io = require('socket.io-client');

export default function (user) {
  const socket = io(process.env.REACT_APP_SOCKET_URL,
    {
      transports: ['websocket', 'polling'],
      query: `userId=${user.id}&role=${user.role}`,
    });

  function registerHandler(onMessageReceived) {
    socket.on('receive-message', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message');
  }

  socket.on('error', (err) => {
    console.log('received socket error:');
    console.log(err);
  });

  function leave(id, cb) {
    socket.emit('leave', id, cb);
  }

  function message(data, role, cb) {
    socket.emit('add-message', data, role, cb);
  }

  function ticket(data) {
    socket.emit('add-ticket', data);
  }

  function closeTicket(data) {
    socket.emit('close-ticket', data);
  }

  function updateBookieaccount(data) {
    socket.emit('update-bookieaccount', data);
  }

  function userRegister(data) {
    socket.emit('user-register', data);
  }

  function joinRoom(ticketId, userId) {
    console.log('join room', ticketId);
    socket.emit('join-room', ticketId, userId);
  }

  function leaveRoom(ticketId, userId) {
    console.log('leave room', ticketId);
    socket.emit('leave-room', userId);
  }


  return {
    registerHandler,
    unregisterHandler,
    message,
    ticket,
    closeTicket,
    updateBookieaccount,
    userRegister,
    joinRoom,
    leaveRoom,
    leave
  };
}
