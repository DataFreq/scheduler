import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];

  const transition = (mode, replace = false) => {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]);
  }

  const back = () => {
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, history.length - 2)])
  }
  
  return { mode, transition, back };
}