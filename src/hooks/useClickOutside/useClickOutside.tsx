import { useEffect, useRef, MutableRefObject } from "react";

function useOutsideClick<T extends HTMLElement>(callback: () => void): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [callback]);

  return ref;
}

export default useOutsideClick;
