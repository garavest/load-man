<script lang="ts">
  import {
    getModalStore,
    getToastStore,
    type Modal,
    Stepper,
    Step,
    ListBox,
    ListBoxItem
  } from "@skeletonlabs/skeleton";
  import type { SuperValidated } from "sveltekit-superforms";
  import { superForm } from "sveltekit-superforms/client";

  import { invalidateAll } from "$app/navigation";
  import { GoogleMapsSearch } from "$lib/components/GoogleMapsSearch";
  import {
    perDiemCreateSchema,
    type PerDiemCreateSchema,
    type PerDiemCreateEntry
  } from "$lib/schemas";

  export let data: SuperValidated<PerDiemCreateSchema>;
  export let parent: Modal;

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  const { enhance, errors, form, tainted } = superForm(data, {
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
          message: "Your per diem entry has been created."
        });

        invalidateAll();
      }
    },
    validators: perDiemCreateSchema
  });

  function isStepLocked(step: keyof PerDiemCreateEntry): boolean {
    if ($tainted && !$tainted[step]) {
      return true;
    }

    if ($errors[step]) {
      return true;
    }

    return false;
  }
</script>

{#if $modalStore[0]}
  <div class="card w-modal space-y-4 p-4 shadow-xl">
    <header class="text-2xl font-bold">Create Per Diem Entry</header>

    <article>
      <form action="?/create" method="POST" use:enhance>
        <Stepper buttonCompleteType="submit">
          <!-- STEP 1: Introduction and confirm date -->
          <Step locked="{isStepLocked('date')}">
            <svelte:fragment slot="header">Get Started</svelte:fragment>
            <p>Welcome! This wizard will help you with the process of creating a per diem entry.</p>
            <p>
              To begin, simply enter the date of the entry you are entering. You can also click the
              calendar icon on the right side of the field to open a date picker.
            </p>

            <label class="label">
              <span>Entry Date</span>
              <input
                class="input rounded-md"
                class:input-error="{$errors.date}"
                placeholder="Entry date..."
                type="date"
                bind:value="{$form.date}" />
            </label>
            {#if $errors.date}
              {#each $errors.date as error}
                <small class="text-error-50-900-token text-sm">{error}</small>
              {/each}
            {/if}
          </Step>

          <!-- STEP 2: Select deduction -->
          <Step locked="{isStepLocked('deduction')}">
            <svelte:fragment slot="header">Select Deduction</svelte:fragment>
            <p>Great! The next step is to select your deduction.</p>

            <ListBox>
              <ListBoxItem bind:group="{$form.deduction}" name="deduction" value="full">
                Full Deduction
              </ListBoxItem>

              <ListBoxItem bind:group="{$form.deduction}" name="deduction" value="partial">
                Partial Deduction
              </ListBoxItem>
            </ListBox>
          </Step>

          <!-- STEP 3: Miles -->
          <Step locked="{isStepLocked('businessMiles') || isStepLocked('personalMiles')}">
            <svelte:fragment slot="header">Enter Mileage</svelte:fragment>
            <p>
              Right on! The next step is to enter your miles. We separate mileage into personal and
              business
            </p>

            <label class="label">
              <span>Business Miles</span>
              <input
                class="input rounded-md"
                class:input-error="{$errors.date}"
                placeholder="Business miles..."
                type="number"
                bind:value="{$form.businessMiles}" />
            </label>
            {#if $errors.businessMiles}
              {#each $errors.businessMiles as error}
                <small class="text-error-50-900-token text-sm">{error}</small>
              {/each}
            {/if}

            <label class="label">
              <span>Personal Miles</span>
              <input
                class="input rounded-md"
                class:input-error="{$errors.date}"
                placeholder="Personal miles..."
                type="number"
                bind:value="{$form.personalMiles}" />
            </label>
            {#if $errors.personalMiles}
              {#each $errors.personalMiles as error}
                <small class="text-error-50-900-token text-sm">{error}</small>
              {/each}
            {/if}
          </Step>

          <!-- STEP 4: Rest location -->
          <Step locked="{isStepLocked('location')}">
            <svelte:fragment slot="header">Enter Rest Location</svelte:fragment>
            <p>
              Almost there. The last step is to enter the location where you took your rest break.
            </p>
            <p>
              You can use the search box below to enter the location and we'll use Google Maps to
              lookup and format the address.
            </p>

            <GoogleMapsSearch bind:data="{$form.location}" />
          </Step>

          <!-- STEP 5: Confirmation -->
          <Step>
            <svelte:fragment slot="header">Confirm the details</svelte:fragment>
            <p>Ok! The final step is to confirm the details below.</p>
            <p>
              This per diem entry is for <b
                >{new Date(Date.parse($form.date)).toLocaleDateString()}</b
              >.
            </p>
            <p>You are taking the <b>{$form.deduction}</b> deduction.</p>
            <p>
              You drove <b>{$form.businessMiles}</b> business miles and <b>{$form.personalMiles}</b>
              personal miles.
            </p>
            <p>You took your rest break at <b>{$form.location.formattedAddress}</b>.</p>
            <p>
              If the information provided is correct, you can click complete and your entry will be
              saved. Otherwise, you can click back to go back and edit the details.
            </p>
          </Step>
        </Stepper>
      </form>
    </article>

    <footer class="modal-footer {parent.regionFooter}">
      <button class="btn {parent.buttonNeutral}" on:click="{parent.onClose}">
        {parent.buttonTextCancel}
      </button>
    </footer>
  </div>
{/if}
