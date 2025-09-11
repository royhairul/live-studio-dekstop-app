export const toLocalDateString = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }); 
};

export const toLocalISOString = (date) => {
  if (!date) return "";
  const local = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );
  return local.toISOString();
};


export function formatDateTarget(date) {
  if (!date) return "";

  const [year, month] = date.split("-");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

export const getYesterdayRange = () => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return {
    from: yesterday,
    to: yesterday,
  };
};

export const formatSince = (day) => {
  if (day > 7) {
    return `periode sebelumnya`;
  } else {
    return `${day} hari sebelumnya`;
  }
};
