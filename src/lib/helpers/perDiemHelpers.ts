import type { PerDiemCreateEntry, PerDiemEditEntry } from "$lib/schemas";

import perDiemRates from "$lib/data/perDiemRates.json";

type PerDiemFormEntry = PerDiemCreateEntry | PerDiemEditEntry;

function checkIsConus(entry: PerDiemFormEntry): boolean {
  const result = entry.location.addressComponents.find((component) => {
    if (component.types.includes("country")) {
      return component.shortName.toLowerCase() !== "us";
    } else if (component.types.includes("administrative_area_level_1")) {
      return (
        component.longName.toLowerCase() === "alaska" ||
        component.longName.toLowerCase() === "hawaii"
      );
    }

    return false;
  });

  return result !== undefined;
}

function calculatePerDiemDeduction(entry: PerDiemFormEntry): number {
  const isConus = checkIsConus(entry);
  const isFullDeduction = entry.deduction === "full";
  const entryDate = Date.parse(entry.date);

  // Find the correct per diem rate
  const perDiemRate = perDiemRates.find((rate) => {
    return entryDate >= Date.parse(rate.startDate) && entryDate <= Date.parse(rate.endDate);
  });

  // Oh no, we didn't get a rate...abort!
  if (!perDiemRate) {
    // Throwing an error seems strange, but we have to in this case since we are in a function
    throw new Error("No per diem rate found");
  }

  // Set the base rate
  let rate: number = isConus ? perDiemRate.rates.oConus : perDiemRate.rates.conus;

  // Apply the correct deduction factor. For 2021-2022, this is 1. All others are 0.8
  rate = rate * perDiemRate.multiplier;

  // Apply the partial deduction penalty...if applicable
  rate = isFullDeduction ? rate : rate * 0.75;

  return rate;
}

export { checkIsConus, calculatePerDiemDeduction };
