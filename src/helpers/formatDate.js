export const toLocalDateString = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }); // output: YYYY-MM-DD
};

export const toLocalISOString = (date) => {
  if (!date) return "";
  const local = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );
  return local.toISOString();
};
