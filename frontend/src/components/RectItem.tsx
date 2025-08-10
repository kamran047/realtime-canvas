import React from "react";
import { Rect } from "react-konva";
import { useRectStore } from "../store/rectStore";
import { socket } from "../services/socket";

type Props = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
};

const RectItem: React.FC<Props> = ({ id, x, y, width, height, fill = "#4f46e5" }) => {
  const updatePos = useRectStore((s) => s.updateRectPos);

  const handleDragMove = (e: any) => {
    const node = e.target;
    const nx = node.x();
    const ny = node.y();

    // Updating state
    updatePos(id, nx, ny);

    // Emitting event to server
    socket.emit("move_rect", { id, x: nx, y: ny });
  };

  return (
    <Rect
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      draggable
      onDragMove={handleDragMove}
      onTap={() => {}}
    />
  );
};

export default RectItem;
