import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

interface Rect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let rects: Record<string, Rect> = {};

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send existing data to new client
  socket.emit("initial_data", Object.values(rects));

  socket.on("create_rect", (rect: Rect) => {
    rects[rect.id] = rect;
    io.emit("create_rect", rect);
  });

  socket.on("move_rect", ({ id, x, y }: { id: string; x: number; y: number }) => {
    if (rects[id]) {
      rects[id].x = x;
      rects[id].y = y;
      io.emit("move_rect", { id, x, y });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
