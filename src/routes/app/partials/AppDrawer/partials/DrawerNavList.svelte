<script lang="ts">
  import DrawerNavListLink from "./DrawerNavListLink.svelte";

  import { fixedLinks, moduleLinks } from "$lib/data/links/appLinks";
</script>

<ul class="list-nav space-y-1">
  {#each fixedLinks as link}
    <DrawerNavListLink {link} />
  {/each}

  {#each moduleLinks as link}
    <DrawerNavListLink {link} />
  {/each}
</ul>
