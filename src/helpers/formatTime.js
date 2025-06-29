export const formatTime = (dateTimeStr) => {
  if (!dateTimeStr) return "";

  try {
    const date = new Date(dateTimeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch (e) {
    return "";
  }
};
