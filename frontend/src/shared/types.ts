export type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
};

export type ServerToClientEvents = {
  initial_data: (arr: Rect[]) => void;
  create_rect: (rect: Rect) => void;
  move_rect: (payload: { id: string; x: number; y: number }) => void;
};
