interface WebSocketService {
  instance: any | null;
}
class WebSocketService {
  static instance: any = null;
  callbacks = {};
  static getInstance(): any {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService?.instance;
  }
  constructor() {
    const self: any = this;
    self.socketRef = null;
  }
  connect(chatURL) {
    const self: any = this;
    var ws_scheme: any = window.location.protocol == "https:" ? "wss" : "ws";
    const path =
      ws_scheme + "://" + window.location.host + "/ws/chat" + `/${chatURL}/`;
    // const path = `ws://theminglemarket.com:8000/ws/chat/${chatURL}/`;
    console.log(path);
    self.socketRef = new WebSocket(path);
    self.socketRef.onopen = () => {
      console.log("websocket is open");
    };
    this.socketNewMessage(JSON.stringify({ command: "fetch_messages" }));
    self.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };
    self.socketRef.onerror = (e) => {
      console.log(e.message);
    };
    self.socketRef.onclose = () => {
      console.log("websocket is closed");
      this.connect(chatURL);
    };
  }
  disconnect() {
    const self: any = this;
    self.socketRef.close();
    self.socketRef.onclose = () => {
      console.log("socket is closed");
    };
  }
  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
    // if (command === "online_users") {
    //   this.callbacks[command](parsedData.users);
    // }
  }

  fetchMessages(username, chatId) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
      chatId: chatId,
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content,
      chatId: message.chatId,
    });
  }
  // getOnlineUsers() {
  //   this.sendMessage({
  //     command: "online_users",
  //   });
  // }

  // addCallbacks(messagesCallbacks, newMessageCallbacks, getOnlineUsers) {
  //   this.callbacks["messages"] = messagesCallbacks;
  //   this.callbacks["new_message"] = newMessageCallbacks;
  //   this.callbacks["online_users"] = getOnlineUsers;
  // }
  addCallbacks(messagesCallbacks, newMessageCallbacks) {
    this.callbacks["messages"] = messagesCallbacks;
    this.callbacks["new_message"] = newMessageCallbacks;
  }
  sendMessage(data) {
    try {
      const self: any = this;
      self.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    const self: any = this;
    return self.socketRef.readyState;
  }

  waitForSocketConnection(callback: any) {
    const self: any = this;
    const socket: any = self.socketRef;
    const recursion = self.waitForSocketConnection;
    setTimeout(function () {
      if (socket.readyState === 1) {
        console.log("Connection is secure");
        if (callback != null) {
          callback();
        }
        return;
      } else {
        console.log("Waiting for connection....");
        recursion(callback);
      }
    }, 1);
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
