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

export function formatDateID(dateStr) {
  const date = new Date(dateStr);
  const todayYear = new Date().getFullYear();

  // format: 20 Sep, atau 20 Sep 2024 kalau beda tahun
  let options = { day: "numeric", month: "short" }; // short = Jan, Feb, Mar...
  if (date.getFullYear() !== todayYear) {
    options.year = "numeric";
  }

  return new Intl.DateTimeFormat("id-ID", options).format(date);
}

export function formatDateIDFull(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

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
    from: yesterday - 1 * 24 * 60 * 60 * 1000,
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

// file: utils/formatters.js

export const formatDurationToHHMMSS = (totalSeconds = 0) => {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return "00:00:00";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Menambahkan '0' di depan untuk format dua digit
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};