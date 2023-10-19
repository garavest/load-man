<script lang="ts">
  import { AppShell, Drawer } from "@skeletonlabs/skeleton";

  import { AppDrawer, AppFooter, AppHeader, AppSidebar } from "./partials";
</script>

<Drawer>
  <AppDrawer />
</Drawer>

<AppShell slotSidebarLeft="hidden md:block">
  <svelte:fragment slot="header"><AppHeader /></svelte:fragment>
  <svelte:fragment slot="sidebarLeft"><AppSidebar /></svelte:fragment>
  <main class="container mx-auto h-full p-4 md:p-8">
    <slot />
  </main>
  <svelte:fragment slot="pageFooter"><AppFooter /></svelte:fragment>
</AppShell>
