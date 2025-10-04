import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { omitUndefined } from "../utils/omitUndefined";



const convex = new ConvexHttpClient("http://localhost:3210");


export const getAllDrivers = async () => {
  return await convex.query(api.functions.drivers.getAll, {});
};

export const createDriver = async (
  name: string,
  phone: string,
  userId: Id<"users">,  // required
  email?: string,
  licenseNumber?: string,
) => {
  return await convex.mutation(
    api.functions.drivers.createDriver,
    omitUndefined({
      name,
      phone,
      userId,
      email,
      licenseNumber,
    })
  );
};

export const updateDriver = async (
  id: Id<"drivers">,
  updates: {
    name?: string;
    licenseNumber?: string;
  }
) => {
  return await convex.mutation(
    api.functions.drivers.updateDriver,
    omitUndefined({ id, ...updates })
  );
};

export const deleteDriver = async (id: Id<"drivers">) => {
  return await convex.mutation(api.functions.drivers.deleteDriver, { id });
};