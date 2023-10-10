function getMonthName(month: number): string {
  return new Date(new Date().getFullYear(), month + 1, 0).toLocaleString("en-US", {
    month: "long"
  });
}

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export { getMonthName, getDaysInMonth };
