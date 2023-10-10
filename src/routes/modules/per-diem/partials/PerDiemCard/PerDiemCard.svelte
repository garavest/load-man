<script lang="ts">
  import type { PerDiemEntry } from "@prisma/client";

  import { getMonthName } from "$lib/helpers";

  export let entry: PerDiemEntry;
  export let handleDelete: (entry: PerDiemEntry) => void;
  export let handleEdit: (entry: PerDiemEntry) => void;

  function onClickDelete(): void {
    handleDelete(entry);
  }

  function onClickEdit(): void {
    handleEdit(entry);
  }
</script>

<div class="bg-initial card card-hover p-4">
  <header class="card-header flex items-center justify-between">
    <h5 class="h5">{`${getMonthName(entry.date.getMonth())} ${entry.date.getDate()}`}</h5>

    <!-- ACTION Buttons -->
    <div>
      <!-- EDIT -->
      <button class="btn-icon hover:variant-soft-primary" on:click="{onClickEdit}">
        <i class="fas fa-pen-to-square"></i>
      </button>

      <!-- DELETE -->
      <button class="btn-icon hover:variant-soft-error" on:click="{onClickDelete}">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </header>
  <div class="flex p-2 lg:p-4">
    <div class="table-container">
      <table class="table table-compact">
        <tbody>
          <tr>
            <th class="text-left">Business Miles</th>
            <td class="text-right">{entry.businessMiles}</td>
          </tr>
          <tr>
            <th class="text-left">Personal Miles</th>
            <td class="text-right">{entry.personalMiles}</td>
          </tr>
          <tr>
            <th class="text-left">Rest Location</th>
            <td class="text-right">{entry.location.formattedAddress}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="text-left">Deduction</th>
            <td class="text-right">${entry.deduction.toFixed(2).toString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>
