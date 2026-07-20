export function formatDateRange(
  startDate?: string,
  endDate?: string,
  current?: boolean,
  currentLabel = "Present",
): string {
  const start = startDate?.trim();
  const end = current ? currentLabel : endDate?.trim();

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start ?? end ?? "";
}
