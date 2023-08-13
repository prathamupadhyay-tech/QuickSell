import React from "react";
import { useEffect } from "react";

export default function listenForOutsideClicks(
  listening,
  setListening,
  menuRef,
  setIsOpen
) {
  return () => {
    if (listening) return;

    if (!menuRef?.current) return; // Check for menuRef validity
    setListening(true);
    ["click", "touchstart"].forEach((type) => {
      document.addEventListener(type, (evt) => {
        const cur = menuRef.current;
        const node = evt.target;
        if (cur.contains(node)) return;
        setIsOpen(false);
      });
    });
  };
}
