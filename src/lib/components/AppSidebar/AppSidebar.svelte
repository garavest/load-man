<script lang="ts">
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";

  import { page } from "$app/stores";
  import modules from "$lib/data/modules.json";

  $: isSelected = (href: string): boolean => href === $page.url.pathname;
</script>

<AppRail>
  <AppRailAnchor href="/" title="Home" selected="{isSelected('/')}">
    <svelte:fragment slot="lead"><i class="fas fa-house"></i></svelte:fragment>
    <span>Home</span>
  </AppRailAnchor>

  {#each modules as module}
    <AppRailAnchor href="{module.href}" title="{module.name}" selected="{isSelected(module.href)}">
      <svelte:fragment slot="lead"><i class="{`fas ${module.icon}`}"></i></svelte:fragment>
      <span>{module.name}</span>
    </AppRailAnchor>
  {/each}
</AppRail>
