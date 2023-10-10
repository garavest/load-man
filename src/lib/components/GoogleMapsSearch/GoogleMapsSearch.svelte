<script lang="ts">
  import { Autocomplete, popup, type PopupSettings } from "@skeletonlabs/skeleton";

  import { getGeocodedAddress, getPlacesAutocompleteOptions } from "$lib/client";
  import type { PlaceOption } from "$lib/interfaces";
  import type { GoogleMapsSearchResult } from "$lib/schemas";

  export let value: GoogleMapsSearchResult | undefined;

  let inputSearch: string = "";
  let tempInput: string;
  let placeOptions: PlaceOption[] = [];

  const popupSettings: PopupSettings = {
    event: "focus-click",
    placement: "top",
    target: "popupAutocomplete"
  };

  function onSearchInput(): void {
    if (value !== undefined) {
      value = undefined;
    }

    placeOptions = getPlacesAutocompleteOptions(inputSearch);
  }

  function onPlaceSelect(event: CustomEvent<PlaceOption>): void {
    value = getGeocodedAddress(event.detail.meta?.prediction.place_id ?? "");
  }

  $: if (value !== undefined && tempInput !== value.formattedAddress) {
    tempInput = value.formattedAddress;
    inputSearch = tempInput;
  }
</script>

<label class="label">
  <span>Search Location</span>
  <input
    class="autocomplete input {$$restProps.class || ''}"
    on:input="{onSearchInput}"
    placeholder="Search..."
    use:popup="{popupSettings}"
    type="search"
    bind:value="{inputSearch}"
    {...$$restProps} />
</label>

<div class="card p-4 shadow-xl" data-popup="popupAutocomplete">
  <Autocomplete
    bind:input="{inputSearch}"
    options="{placeOptions}"
    regionButton="!whitespace-normal text-left !w-full"
    on:selection="{onPlaceSelect}" />
  <div class="bg-surface-100-800-token arrow"></div>
</div>
