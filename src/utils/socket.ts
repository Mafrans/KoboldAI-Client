import { io } from "socket.io-client";

export const socket = io(`http://${location.hostname}:5000`);
