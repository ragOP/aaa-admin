import { format } from "date-fns";

export function customDateFormatting({
  date,
  formatString = "dd/MM/yy hh:mm a",
  fallback = "Invalid Date",
}) {
  // Check for null, undefined, or non-string/non-date inputs
  if (!date || (typeof date !== "string" && !(date instanceof Date))) {
    return fallback;
  }

  try {
    const formattedDate = format(date, formatString);
    return formattedDate;
  } catch (error) {
    console.error("Date formatting error:", error.message);
    return fallback;
  }
}
