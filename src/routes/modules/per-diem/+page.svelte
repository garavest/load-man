<script lang="ts">
  import type { PerDiemEntry } from "@prisma/client";
  import {
    getModalStore,
    getToastStore,
    type ModalComponent,
    type ModalSettings
  } from "@skeletonlabs/skeleton";

  import type { PageData } from "./$types";
  import { PerDiemCard } from "./partials/PerDiemCard";
  import { PerDiemCreateModal } from "./partials/PerDiemCreateModal";
  import { PerDiemEditModal } from "./partials/PerDiemEditModal";
  import { selectedMonth, selectedYear } from "./stores";

  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { getMonthName } from "$lib/helpers";

  export let data: PageData;

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  const currentMonth: number = new Date().getMonth();
  const currentYear: number = new Date().getFullYear();

  selectedMonth.set(currentMonth);
  selectedYear.set(currentYear);

  const months = Array(12)
    .fill(0)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    .map((_, i) => i);
  const years = Array(8)
    .fill(0)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    .map((_, i) => $selectedYear - i);

  function openCreateModal(): void {
    const modalComponent: ModalComponent = {
      props: { data: data.createForm },
      ref: PerDiemCreateModal
    };

    const modal: ModalSettings = {
      component: modalComponent,
      type: "component"
    };

    modalStore.trigger(modal);
  }

  function openDeleteModal(entry: PerDiemEntry): void {
    const modal: ModalSettings = {
      body: "Are you sure you wish to proceed? This action is <b>NOT</b> reversible!",
      response(r) {
        if (r === true) {
          fetch(`/modules/per-diem/${entry.id}`, { method: "DELETE" })
            .then(() => {
              toastStore.trigger({
                background: "variant-filled-success",
                message: "Per diem entry has been successfully deleted."
              });

              invalidateAll();
            })
            .catch((err) => {
              toastStore.trigger({
                background: "variant-filled-error",
                message: "Oops. Something went wrong. Per diem entry could not be deleted."
              });

              console.error(err);
            });
        }
      },
      title: "Please Confirm",
      type: "confirm"
    };

    modalStore.trigger(modal);
  }

  function openEditModal(entry: PerDiemEntry): void {
    const modalComponent: ModalComponent = {
      props: { data: data.editForm, entry },
      ref: PerDiemEditModal
    };

    const modal: ModalSettings = {
      component: modalComponent,
      type: "component"
    };

    modalStore.trigger(modal);
  }

  function onMonthChange() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    query.set("month", $selectedMonth.toString());
    goto(`?${query.toString()}`);
  }

  function onYearChange() {
    const query = new URLSearchParams($page.url.searchParams.toString());

    query.set("year", $selectedYear.toString());
    goto(`?${query.toString()}`);
  }
</script>

<h1 class="h1">Per Diem</h1>

<div id="description">
  <p class="mt-2">
    Welcome to the Per Diem Module. This module is used to track daily per diem deductions, as well
    as mileage (separated by personal and business miles).
  </p>
  <p>
    Please note: this module is to help you <b>LOG</b> your per diem only. You are still responsible
    for ensuring your per diem is adequately and legally logged. If you have questions, please consult
    with a tax professional that has experience in the transportation industry.
  </p>
</div>

<hr class="my-8 !border-t-4" />

<div class="mb-4 flex flex-row items-end gap-4 align-middle">
  <select class="select" bind:value="{$selectedMonth}" on:change="{onMonthChange}">
    {#each months as month}
      <option value="{month}">{getMonthName(month)}</option>
    {/each}
  </select>

  <select class="select" bind:value="{$selectedYear}" on:change="{onYearChange}">
    {#each years as year}
      <option value="{year}">{year}</option>
    {/each}
  </select>

  <button class="variant-filled btn" on:click="{openCreateModal}" type="button">
    <span><i class="fas fa-plus"></i></span>
    <span>Create Entry</span>
  </button>
</div>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
  {#if data.perDiemEntries.length > 0}
    {#each data.perDiemEntries as perDiemEntry}
      <PerDiemCard
        entry="{perDiemEntry}"
        handleDelete="{openDeleteModal}"
        handleEdit="{openEditModal}" />
    {/each}
  {:else}
    <p>
      No per diem entries found for the month and year selected. Use the Create Entry button above
      to create an entry.
    </p>
  {/if}
</div>
