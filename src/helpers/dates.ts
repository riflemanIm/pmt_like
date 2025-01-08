import dayjs from "dayjs";

export function formatDate(
  dateString: string,
  formatString: "DD.MM.YYYY"
): string {
  return dayjs(dateString).format(formatString);
}
