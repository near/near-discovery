import { useState, useCallback } from "react";

export function useFlags() {
  const [rawFlags, setRawFlags] = useState(
    localStorage.getItem("flags")
      ? JSON.parse(localStorage.getItem("flags"))
      : {}
  );

  const setFlags = useCallback((newFlags) => {
    setRawFlags((f) => {
      const updated = { ...f, ...newFlags };
      localStorage.setItem("flags", JSON.stringify(updated));

      alert("Saved flags");

      // reload for changes to take effect
      location.reload();

      // may not be reachable
      return updated;
    });
  });

  return [rawFlags, setFlags];
}
