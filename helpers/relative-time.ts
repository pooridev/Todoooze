const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 1000 * 60 * 60 * 24 * 365],
  ["month", 1000 * 60 * 60 * 24 * 30],
  ["week", 1000 * 60 * 60 * 24 * 7],
  ["day", 1000 * 60 * 60 * 24],
  ["hour", 1000 * 60 * 60],
  ["minute", 1000 * 60],
];

export const formatRelativeTime = (timestamp?: number): string => {
  if (!timestamp) return "";

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diff = timestamp - Date.now();

  for (const [unit, ms] of UNITS) {
    if (Math.abs(diff) >= ms) {
      return formatter.format(Math.round(diff / ms), unit);
    }
  }

  return "just now";
};
