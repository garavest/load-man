import type { PerDiemEntry } from "@prisma/client";
import { fail } from "@sveltejs/kit";
import { actionResult, superValidate } from "sveltekit-superforms/server";

import type { Actions, PageServerLoad } from "./$types";

import {
  calculatePerDiemDeduction,
  checkIsConus,
  convertStringToDate,
  getDaysInMonth
} from "$lib/helpers";
import { perDiemCreateSchema, perDiemEditSchema } from "$lib/schemas";
import { prisma } from "$lib/server";

const load: PageServerLoad = ({ url }) => {
  // eslint-disable-next-line require-await
  const getCreateForm = async () => {
    return superValidate(perDiemCreateSchema);
  };

  // eslint-disable-next-line require-await
  const getEditForm = async () => {
    return superValidate(perDiemEditSchema);
  };

  // eslint-disable-next-line require-await
  const fetchPerDiemEntries = async () => {
    let month = Number(url.searchParams.get("month"));
    let year = Number(url.searchParams.get("year"));

    if (!month) {
      month = new Date().getMonth();
    }

    if (!year) {
      year = new Date().getFullYear();
    }

    const startDate = new Date(year, month);
    const endDate = new Date(year, month, getDaysInMonth(month, year));

    if (isNaN(month) || isNaN(year)) {
      throw fail(418);
    }

    return prisma.perDiemEntry.findMany({
      orderBy: [{ date: "asc" }],
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });
  };

  return {
    createForm: getCreateForm(),
    editForm: getEditForm(),
    perDiemEntries: fetchPerDiemEntries()
  };
};

const actions: Actions = {
  async create({ request }) {
    const form = await superValidate(request, perDiemCreateSchema);
    let entry: PerDiemEntry;

    if (!form.valid) {
      return actionResult("failure", { form });
    }

    // Why a try/catch block? So we can catch the failure and return an actionResult
    try {
      entry = await prisma.perDiemEntry.create({
        data: {
          businessMiles: form.data.businessMiles,
          date: form.data.date,
          deduction: calculatePerDiemDeduction(form.data),
          isConus: checkIsConus(form.data),
          isFullDeduction: form.data.deduction === "full",
          location: form.data.location,
          personalMiles: form.data.personalMiles
        }
      });
    } catch (error) {
      return actionResult("error", { form });
    }

    if (typeof entry === "undefined") {
      return actionResult("error", { form });
    }

    return actionResult("success", { form });
  },

  async update({ request }) {
    const form = await superValidate(request, perDiemEditSchema);
    let entry: PerDiemEntry;

    if (!form.valid) {
      return actionResult("failure", { form });
    }

    try {
      entry = await prisma.perDiemEntry.update({
        data: {
          businessMiles: form.data.businessMiles,
          date: convertStringToDate(form.data.date),
          deduction: calculatePerDiemDeduction(form.data),
          isConus: checkIsConus(form.data),
          isFullDeduction: form.data.deduction === "full",
          location: form.data.location,
          personalMiles: form.data.personalMiles
        },
        where: {
          id: form.data.id
        }
      });
    } catch (error) {
      return actionResult("error", { form });
    }

    if (typeof entry === "undefined") {
      return actionResult("error", { form });
    }

    return actionResult("success", { form });
  }
};

export { actions, load };
