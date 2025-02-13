import { io } from "socket.io-client";
import { BACK_URL } from "./consts";

export const socket = io(BACK_URL)