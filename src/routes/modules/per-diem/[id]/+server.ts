import type { RequestHandler } from "./$types";

import { prisma } from "$lib/server";

const DELETE: RequestHandler = async ({ params }) => {
  await prisma.perDiemEntry.delete({
    where: { id: params.id }
  });

  return new Response(null, { status: 204 });
};

export { DELETE };
