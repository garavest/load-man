import { z } from "zod";

import { googleMapsSearchSchema } from "$lib/schemas";

const perDiemEditSchema = z.object({
  businessMiles: z.number().min(0).max(9999),
  date: z.string(),
  deduction: z.union([z.literal("full"), z.literal("partial")]),
  id: z.string(),
  location: googleMapsSearchSchema,
  personalMiles: z.number().min(0).max(9999)
});

type PerDiemEditSchema = typeof perDiemEditSchema;
type PerDiemEditEntry = z.infer<typeof perDiemEditSchema>;

export { type PerDiemEditEntry, type PerDiemEditSchema, perDiemEditSchema };
