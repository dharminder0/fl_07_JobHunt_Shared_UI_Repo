import { useNavigate } from "react-router-dom";

export function useSafeNavigate() {
  try {
    return useNavigate();
  } catch {
    return () => {
      console.warn("Router not available, navigate skipped.");
    };
  }
}
