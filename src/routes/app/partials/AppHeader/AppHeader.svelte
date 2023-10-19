<script lang="ts">
  import { AppBar, getDrawerStore, LightSwitch } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  function openDrawer(): void {
    drawerStore.open();
  }
</script>

<AppBar slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <button class="btn btn-sm mr-4 md:hidden" on:click="{openDrawer}">
      <i class="fas fa-bars text-xl"></i>
    </button>
  </svelte:fragment>

  <a href="/" class="text-xl uppercase">LoadMan</a>

  <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
