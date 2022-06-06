import io from "socket.io-client";

let socket;

export const initiateSocket = (newsocket) => {
  socket = io.connect("https://rladuddn.shop/");
  socket && newsocket(socket);
  socket.emit("chatRoom");
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};


export const getMessages = (newsocket) => {
  if (!socket) return;
  socket.on("chatList", (message) => {
    return newsocket(message);
  });
};


export const subscribeToChat = (newsocket) => {
  if (!socket) return;
  socket.on("chatMessage", (data) => {
    return newsocket(data);
  });
};


export const sendMessage = (userId, message) => {
  if (socket) {
    socket.emit("reqMessage", message, userId);
  }
};