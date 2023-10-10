<script lang="ts">
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  import { page } from "$app/stores";
  import type { NavigationLink } from "$lib/interfaces/navigationLink";

  const drawerStore = getDrawerStore();

  function closeDrawer(): void {
    drawerStore.close();
  }

  export let link: NavigationLink;

  $: isActiveLink = link.href === $page.url.pathname ? "!bg-primary-500" : "";
</script>

<li>
  <a href="{link.href}" class="{isActiveLink}" on:click="{closeDrawer}">
    <span class="badge"><i class="{`fas ${link.icon}`}"></i></span>
    <span class="flex-auto">{link.text}</span>
  </a>
</li>
