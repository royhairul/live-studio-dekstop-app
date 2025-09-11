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


export function intToHumanTime(seconds) {
  if (!seconds || seconds < 0) return "0 Menit";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (hrs > 0) parts.push(`${hrs} Jam`);
  if (mins > 0) parts.push(`${mins} Menit`);

  return parts.length > 0 ? parts.join(" ") : "0 Menit";
}
