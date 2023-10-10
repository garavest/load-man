import { z } from "zod";

const googleMapsSearchSchema = z.object({
  addressComponents: z.array(
    z.object({
      longName: z.string(),
      shortName: z.string(),
      types: z.array(z.string())
    })
  ),
  formattedAddress: z.string(),
  placeId: z.string()
});

type GoogleMapsSearchResult = z.infer<typeof googleMapsSearchSchema>;

export { type GoogleMapsSearchResult, googleMapsSearchSchema };
