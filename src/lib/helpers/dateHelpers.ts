function convertStringToDate(date: string): Date {
  const dateParts = date.split(/\D/);
  const [year, month, day] = dateParts;

  return new Date(Number(year), Number(month) - 1, Number(day), 19, 0, 0, 0);
}

function getMonthName(month: number): string {
  return new Date(new Date().getFullYear(), month + 1, 0).toLocaleString("en-US", {
    month: "long"
  });
}

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export { convertStringToDate, getMonthName, getDaysInMonth };
