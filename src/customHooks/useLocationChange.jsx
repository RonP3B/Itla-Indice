import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useLocationChange = (action) => {
  const location = useLocation();

  useEffect(() => {
    action(location);
  }, [location]);
};
