import { useRef } from "react";

export const useSwipe = (onLeft: () => void, onRight: () => void) => {
  const startX = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;

    const diff = e.clientX - startX.current;

    if (diff > 60) onRight();
    else if (diff < -60) onLeft();

    startX.current = null;
  };

  return { onPointerDown, onPointerUp };
};
