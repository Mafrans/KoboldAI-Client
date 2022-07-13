class Socket {
  ws: WebSocket;
  constructor() {
    const url = new URL("ws://127.0.0.1:5000/socket.io");
    url.searchParams.set("transport", "websocket");
    this.ws = new WebSocket(url.href);

    this.ws.addEventListener("message", console.log);
  }
}
