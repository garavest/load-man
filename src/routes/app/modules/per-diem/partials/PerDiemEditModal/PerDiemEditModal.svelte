<script lang="ts">
  import type { PerDiemEntry } from "@prisma/client";
  import { getModalStore, getToastStore, type Modal } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import type { SuperValidated } from "sveltekit-superforms";
  import { superForm } from "sveltekit-superforms/client";

  import { GoogleMapsSearch } from "$lib/components/GoogleMapsSearch";
  import { perDiemEditSchema, type PerDiemEditSchema } from "$lib/schemas";

  export let data: SuperValidated<PerDiemEditSchema>;
  export let entry: PerDiemEntry;
  export let parent: Modal;

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  const { form, enhance, errors } = superForm(data, {
    dataType: "json",
    onError({ result }) {
      toastStore.trigger({
        background: "variant-filled-error",
        message: result.error.message
      });
    },
    onResult({ result }) {
      if (result.status && result.status < 400) {
        modalStore.close();
        toastStore.trigger({
          background: "variant-filled-success",
          message: "Your per diem entry has been updated"
        });
      }
    },
    validators: perDiemEditSchema
  });

  function formatDate(date: Date): string {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);

    const dateString = `${date.getFullYear()}-${month}-${day}`;

    return dateString;
  }

  onMount(() => {
    form.update((formValues) => {
      return {
        ...formValues,
        businessMiles: entry.businessMiles,
        date: formatDate(entry.date),
        deduction: entry.isFullDeduction ? "full" : "partial",
        id: entry.id,
        location: entry.location,
        personalMiles: entry.personalMiles
      };
    });
  });
</script>

{#if $modalStore[0]}
  <div class="card w-modal space-y-6 p-4 shadow-xl lg:space-y-8">
    <header class="text-2xl font-bold">Edit Per Diem Entry</header>

    <article>
      <form class="modal-form space-y-4 lg:space-y-6" action="?/update" method="POST" use:enhance>
        <input aria-hidden="true" disabled="{true}" hidden="{true}" bind:value="{$form.id}" />

        <label class="label">
          <span>Date</span>
          <input
            aria-invalid="{$errors.date ? 'true' : undefined}"
            class="input rounded-md"
            class:input-error="{$errors.date}"
            type="date"
            bind:value="{$form.date}" />
        </label>

        <label class="label">
          <span>Deduction</span>
          <select
            aria-invalid="{$errors.deduction ? 'true' : undefined}"
            class="select"
            class:input-error="{$errors.deduction}"
            bind:value="{$form.deduction}">
            <option value="full">Full</option>
            <option value="partial">Partial</option>
          </select>
        </label>

        <label class="label">
          <span>Business Miles</span>
          <input
            aria-invalid="{$errors.businessMiles ? 'true' : undefined}"
            class="input rounded-md"
            class:input-error="{$errors.businessMiles}"
            type="number"
            bind:value="{$form.businessMiles}" />
        </label>

        <label class="label">
          <span>Personal Miles</span>
          <input
            aria-invalid="{$errors.personalMiles ? 'true' : undefined}"
            class="input rounded-md"
            class:input-error="{$errors.personalMiles}"
            type="number"
            bind:value="{$form.personalMiles}" />
        </label>

        <GoogleMapsSearch bind:data="{$form.location}" />
      </form>
    </article>

    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click="{parent.onClose}">
        {parent.buttonTextCancel}
      </button>
    </footer>
  </div>
{/if}
