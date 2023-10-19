<script lang="ts">
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
  import "@fortawesome/fontawesome-free/css/brands.css";
  import "@fortawesome/fontawesome-free/css/fontawesome.css";
  import "@fortawesome/fontawesome-free/css/solid.css";
  import { initializeStores, Modal, storePopup, Toast } from "@skeletonlabs/skeleton";

  import "../app.postcss";

  initializeStores();
  storePopup.set({ arrow, autoUpdate, computePosition, flip, offset, shift });
</script>

<Toast />
<Modal />

<slot />
