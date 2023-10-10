import { z } from "zod";

import { googleMapsSearchSchema } from "$lib/schemas";

const perDiemCreateSchema = z.object({
  businessMiles: z.number().min(0).max(9999),
  date: z.string(),
  deduction: z.union([z.literal("full"), z.literal("partial")]).default("full"),
  location: googleMapsSearchSchema,
  personalMiles: z.number().min(0).max(9999)
});

type PerDiemCreateSchema = typeof perDiemCreateSchema;
type PerDiemCreateEntry = z.infer<typeof perDiemCreateSchema>;

export { type PerDiemCreateEntry, type PerDiemCreateSchema, perDiemCreateSchema };
