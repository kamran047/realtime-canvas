import { create } from 'zustand';

type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
};

type State = {
  rects: Record<string, Rect>;
  addRect: (rect: Rect) => void;
  updateRectPos: (id: string, x: number, y: number) => void;
  setAllRects: (rects: Rect[]) => void;
};

export const useRectStore = create<State>((set) => ({
  rects: {},
  addRect: (r) =>
    set((s) => ({ rects: { ...s.rects, [r.id]: r } })),
  updateRectPos: (id, x, y) =>
    set((s) => {
      const r = s.rects[id];
      if (!r) return s; 
      return { rects: { ...s.rects, [id]: { ...r, x, y } } };
    }),
  setAllRects: (arr) =>
    set(() => {
      const map: Record<string, Rect> = {};
      arr.forEach((r) => (map[r.id] = r));
      return { rects: map };
    }),
}));
