import { writable } from "svelte/store";

const selectedDate = writable(0);
const selectedMonth = writable(0);
const selectedYear = writable(0);

export { selectedDate, selectedMonth, selectedYear };
