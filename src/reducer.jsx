export const defaultWarning = {
  top: -500,
  left: 0,
  message: "",
};

export const reducer = (warning, action) => {
  if (action.type === "SET_WARNING_INFO") {
    const { top, left, message } = action.payload;
    window.scrollTo({ top: top - 70, behavior: "smooth" });
    return { ...warning, top, left, message };
  }

  if (action.type === "RESET_WARNING_INFO") {
    return defaultWarning;
  }

  throw new Error("No matching action type.");
};
