<script lang="ts">
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  function closeDrawer(): void {
    drawerStore.close();
  }
</script>

<div class="flex w-full items-center justify-between">
  <a href="/" class="text-xl uppercase" on:click="{closeDrawer}">LoadMan</a>

  <button class="variant-ringed-surface btn" on:click="{closeDrawer}">
    <i class="fas fa-xmark"></i>
  </button>
</div>

<hr class="my-4 !border-t-2" />
