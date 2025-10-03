import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { omitUndefined } from "../utils/omitUndefined";


const convex = new ConvexHttpClient("http://localhost:3210");


export const getAllTrucks = async () => {
    return await convex.query(api.functions.trucks.getAll, {});

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
