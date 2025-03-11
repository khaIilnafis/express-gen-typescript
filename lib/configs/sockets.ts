export const socketsConfig = {
  SOCKETS: {
    imports: {
      SOCKETIO: {
        NAME: "socket.io",
        DEFAULT: {},
        NAMED: {
          SERVER: ["Server", "SocketIOServer"],
        },
      },
    },
  },
};
