import { Loader } from "@googlemaps/js-api-loader";

import { PUBLIC_GOOGLE_MAPS_API_KEY } from "$env/static/public";
import type { PlaceOption } from "$lib/interfaces";
import type { GoogleMapsSearchResult } from "$lib/schemas";

let loader: Loader;

function getLoader(): Loader {
  if (typeof loader === "undefined") {
    loader = new Loader({
      apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ["geocoding", "places"],
      version: "weekly"
    });
  }

  return loader;
}

async function getPlacesAutocompleteOptions(searchString: string): Promise<PlaceOption[]> {
  const placeOptions: PlaceOption[] = [];

  const placesLibrary = await getLoader().importLibrary("places");
  const autocompleteService = new placesLibrary.AutocompleteService();
  const autocompleteResponse = await autocompleteService.getPlacePredictions({
    input: searchString
  });

  if (autocompleteResponse.predictions.length > 0) {
    autocompleteResponse.predictions.forEach((prediction) => {
      placeOptions.push({
        label: `<span><b>${prediction.structured_formatting.main_text}</b>, ${prediction.structured_formatting.secondary_text}</span>`,
        meta: {
          prediction
        },
        value: prediction.place_id
      });
    });
  }

  return placeOptions;
}

async function getGeocodedAddress(placeId: string): Promise<GoogleMapsSearchResult> {
  const geocodingLibrary = await getLoader().importLibrary("geocoding");
  const geocoder = new geocodingLibrary.Geocoder();
  const geocoderResponse = await geocoder.geocode({ placeId });
  const [result] = geocoderResponse.results;

  return {
    addressComponents: result.address_components.map((addressComponent) => {
      return {
        longName: addressComponent.long_name,
        shortName: addressComponent.short_name,
        types: addressComponent.types
      };
    }),
    formattedAddress: result.formatted_address,
    placeId: result.place_id
  };
}

export { getGeocodedAddress, getPlacesAutocompleteOptions };
