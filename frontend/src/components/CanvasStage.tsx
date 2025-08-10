import React, { useEffect } from "react";
import { Stage, Layer } from "react-konva";
import RectItem from "./RectItem";
import { useRectStore } from "../store/rectStore";
import { socket } from "../services/socket";

const CanvasStage: React.FC = () => {
  const rects = useRectStore((s) => s.rects);
  const addRect = useRectStore((s) => s.addRect);
  const setAllRects = useRectStore((s) => s.setAllRects);
  const updateRectPos = useRectStore((s) => s.updateRectPos);

  useEffect(() => {
    socket.on("initial_data", (arr) => {
      setAllRects(arr);
    });

    socket.on("create_rect", (rect) => {
      addRect(rect);
    });

    socket.on("move_rect", ({ id, x, y }) => {
      updateRectPos(id, x, y);
    });

    return () => {
      socket.off("initial_data");
      socket.off("create_rect");
      socket.off("move_rect");
    };
  }, [addRect, setAllRects, updateRectPos]);

  return (
    <Stage width={800} height={600} style={{ border: "1px solid #ddd" }}>
      <Layer>
        {Object.values(rects).map((r) => (
          //Rectangle Item
          <RectItem key={r.id} {...r} />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasStage;
