import { useRef, useCallback } from "react";

export function useClickGuard({ moveThreshold = 6, suppressMs = 350 } = {}) {
  const start = useRef({ x: 0, y: 0, active: false, moved: false });
  const suppressUntil = useRef(0);

  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, active: true, moved: false };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!start.current.active) return;

    const dx = Math.abs(e.clientX - start.current.x);
    const dy = Math.abs(e.clientY - start.current.y);

    if (dx > moveThreshold || dy > moveThreshold) {
      start.current.moved = true;
    }
  }, [moveThreshold]);

  const onPointerUp = useCallback(() => {
    start.current.active = false;
  }, []);

  const markDraggedNow = useCallback(() => {
    suppressUntil.current = Date.now() + suppressMs;
  }, [suppressMs]);

  const shouldAllowClick = useCallback(() => {
    const now = Date.now();
    if (now < suppressUntil.current) return false;
    if (start.current.moved) return false;
    return true;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, shouldAllowClick, markDraggedNow };
}
