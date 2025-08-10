import React from "react";
import CanvasStage from "./components/CanvasStage";
import { useRectStore } from "./store/rectStore";
import { socket } from "./services/socket";
import { nanoid } from "nanoid";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App: React.FC = () => {
  const addRect = useRectStore((s) => s.addRect);

  const handleAddRect = () => {
    const id = nanoid();
    const newRect = {
      id,
      x: randomInt(10, 600),
      y: randomInt(10, 400),
      width: 100,
      height: 70,
      fill: `hsl(${randomInt(0, 360)} 70% 60%)`,
    };
    addRect(newRect);

    // Emitting event to server (server will broadcast to other clients)
    socket.emit("create_rect", newRect);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow rounded p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Realtime Canvas</h1>
          <div>
            <button
              onClick={handleAddRect}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add Rectangle
            </button>
          </div>
        </div>

        <CanvasStage />
      </div>
    </div>
  );
};

export default App;
