<script lang="ts">
  import { Autocomplete, popup, type PopupSettings } from "@skeletonlabs/skeleton";
  import { writable } from "svelte/store";

  import { getGeocodedAddress, getPlacesAutocompleteOptions } from "$lib/client";
  import type { PlaceOption } from "$lib/interfaces";
  import type { GoogleMapsSearchResult } from "$lib/schemas";

  export let data: GoogleMapsSearchResult;

  let placeOptions: PlaceOption[] = [];

  const popupSettings: PopupSettings = {
    event: "focus-click",
    placement: "top",
    target: "popupAutocomplete"
  };

  async function onSearchInput(): Promise<void> {
    placeOptions = await getPlacesAutocompleteOptions($inputSearch);
  }

  async function onPlaceSelect(event: CustomEvent<PlaceOption>): Promise<void> {
    data = await getGeocodedAddress(event.detail.meta?.prediction.place_id ?? "");
  }

  $: inputSearch = writable<string>(data.formattedAddress);
</script>

<label class="label">
  <span>Search Location</span>
  <input
    class="autocomplete input rounded-md {$$restProps.class || ''}"
    on:input="{onSearchInput}"
    placeholder="Search..."
    use:popup="{popupSettings}"
    type="search"
    bind:value="{$inputSearch}"
    {...$$restProps} />
</label>

<div class="card p-4 shadow-xl" data-popup="popupAutocomplete">
  <Autocomplete
    bind:input="{$inputSearch}"
    options="{placeOptions}"
    regionButton="!whitespace-normal text-left !w-full"
    on:selection="{onPlaceSelect}" />
  <div class="bg-surface-100-800-token arrow"></div>
</div>
