import type { AutocompleteOption } from "@skeletonlabs/skeleton";

export type PlaceOption = AutocompleteOption<
  string,
  { prediction: google.maps.places.AutocompletePrediction }
>;
