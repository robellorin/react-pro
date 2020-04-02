const io = require('socket.io-client')

export default function (user) {
  const socket = io(process.env.REACT_APP_SOCKET_URL,
    {
      transports: [ 'websocket', 'polling' ],
      query: `userId=${user.id}&role=${user.role}`,
    });

  function registerHandler(onMessageReceived) {
    socket.on('receive-message', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message');
  }
  
  socket.on('error', function (err) {
    console.log('received socket error:');
    console.log(err)
  })

  function leave(id, cb) {
    socket.emit('leave', id, cb);
  }
    
  function message(msg, role, cb) {
    socket.emit('add-message', msg, role, cb);
  }

  function ticket(msg) {
    console.log(msg);
    socket.emit('add-ticket', msg);
  }

  function closeTicket(msg) {
    socket.emit('close-ticket', msg);
  }

  function updateBookieaccount(msg) {
    socket.emit('update-bookieaccount', msg);
  }

  function userRegister(msg) {
    socket.emit('user-register', msg);
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
  }
}
