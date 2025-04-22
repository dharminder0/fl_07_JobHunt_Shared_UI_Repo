import { useLocation } from "react-router-dom";

export function useSafeLocation() {
  try {
    return useLocation();
  } catch {
    return null;
  }
}
