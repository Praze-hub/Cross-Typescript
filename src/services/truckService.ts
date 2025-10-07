import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { omitUndefined } from "../utils/omitUndefined";
import { Id } from "../../convex/_generated/dataModel"; 


const convex = new ConvexHttpClient("http://localhost:3210");


export const getAllTrucks = async () => {
    return await convex.query(api.functions.trucks.getAllTheTrucks, {});

};

export const createTruck = async (
    plateNumber: string,
    model?: string,
    mileage?: number
) => {
    return await convex.mutation(api.functions.trucks.createTruck, 
        omitUndefined({
        plateNumber,
        model,
        mileage,
    })
 );
};

export const updateTruck = async (
  id: Id<'trucks'>,
  updates: {
    plateNumber?: string;
    model?: string;
    mileage?: number;
    lastMaintenanceAt?: number;
  }
) => {
  return await convex.mutation(api.functions.trucks.updateTruck, {
    id,
    ...updates,
  });
};

export const deleteTruck = async (id: Id<'trucks'>) => {
  return await convex.mutation(api.functions.trucks.deleteTruck, { id });
};
