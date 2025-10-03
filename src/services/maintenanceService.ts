import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { omitUndefined } from "../utils/omitUndefined";
import { Id } from  "../../convex/_generated/dataModel"; 

const convex = new ConvexHttpClient("http://localhost:3210");

export const getAllMaintenance = async () => {
  return await convex.query(api.functions.maintenance.getAll, {});
};

export const scheduleMaintenance = async (
  truck: Id<'trucks'>,
  scheduledAt: number,
  notes?: string
) => {
  return await convex.mutation(api.functions.maintenance.scheduleMaintenance, omitUndefined({
    truck,
    scheduledAt,
    notes,
  })
);
};
