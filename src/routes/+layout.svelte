<script lang="ts">
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
  import "@fortawesome/fontawesome-free/css/brands.css";
  import "@fortawesome/fontawesome-free/css/fontawesome.css";
  import "@fortawesome/fontawesome-free/css/solid.css";
  import {
    AppShell,
    Drawer,
    initializeStores,
    Modal,
    storePopup,
    Toast
  } from "@skeletonlabs/skeleton";

  import "../app.postcss";

  import { AppDrawer } from "$lib/components/AppDrawer";
  import { AppFooter } from "$lib/components/AppFooter";
  import { AppHeader } from "$lib/components/AppHeader";
  import { AppSidebar } from "$lib/components/AppSidebar";

  initializeStores();
  storePopup.set({ arrow, autoUpdate, computePosition, flip, offset, shift });
</script>

<Drawer>
  <AppDrawer />
</Drawer>

<Toast />
<Modal />

<AppShell slotSidebarLeft="hidden md:block">
  <svelte:fragment slot="header"><AppHeader /></svelte:fragment>
  <svelte:fragment slot="sidebarLeft"><AppSidebar /></svelte:fragment>
  <main class="container mx-auto h-full p-4 md:p-8">
    <slot />
  </main>
  <svelte:fragment slot="pageFooter"><AppFooter /></svelte:fragment>
</AppShell>
