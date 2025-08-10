import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents } from "../shared/types";

export const socket: Socket<ServerToClientEvents> = io("http://localhost:4000");
