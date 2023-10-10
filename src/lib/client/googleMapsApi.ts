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

function getPlacesAutocompleteOptions(searchString: string): PlaceOption[] {
  const placeOptions: PlaceOption[] = [];

  getLoader()
    .importLibrary("places")
    .then((placesLibrary) => {
      const autocompleteService = new placesLibrary.AutocompleteService();

      autocompleteService
        .getPlacePredictions({ input: searchString })
        .then((response) => {
          if (response.predictions.length > 0) {
            response.predictions.forEach((prediction) => {
              placeOptions.push({
                label: `<span><b>${prediction.structured_formatting.main_text}</b>, ${prediction.structured_formatting.secondary_text}</span>`,
                meta: {
                  prediction
                },
                value: prediction.place_id
              });
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });

  return placeOptions;
}

function getGeocodedAddress(placeId: string): GoogleMapsSearchResult | undefined {
  let geocodedAddress: GoogleMapsSearchResult | undefined;

  getLoader()
    .importLibrary("geocoding")
    .then((geocodingLibrary) => {
      const geocoder = new geocodingLibrary.Geocoder();

      geocoder
        .geocode({ placeId })
        .then((response) => {
          const [result] = response.results;

          geocodedAddress = {
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
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });

  return geocodedAddress;
}

export { getGeocodedAddress, getPlacesAutocompleteOptions };
