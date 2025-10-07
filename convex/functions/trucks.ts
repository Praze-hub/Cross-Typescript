import { query, mutation } from '../_generated/server'
import { v } from 'convex/values'

export const getAllTheTrucks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('trucks').collect();
    },
});

export const createTruck = mutation({
    args: {
        plateNumber: v.string(),
        model: v.optional(v.string()),
        mileage: v.optional(v.number()),
        lastMaintenanceAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const truckId = await ctx.db.insert('trucks', {
            ...args,
        });
        return truckId;
    },
});

export const updateTruck = mutation({
    args: {
        id: v.id('trucks'),
        plateNumber: v.optional(v.string()),
        model: v.optional(v.string()),
        mileage: v.optional(v.number()),
        lastMaintenanceAt: v.optional(v.number()),
    },
    async handler(ctx, args){

        const {id, plateNumber, model, mileage, lastMaintenanceAt} = args;

        const updates: Partial<{
            plateNumber: string;
            model: string;
            mileage: number;
            lastMaintenanceAt: number;
        }> = {};

        if (plateNumber) updates.plateNumber = plateNumber;
        if (model) updates.model = model;
        if (mileage) updates.mileage = mileage;
        if (lastMaintenanceAt) updates.lastMaintenanceAt = lastMaintenanceAt;


        await ctx.db.patch(id, updates);

        const updatedTrucks = await ctx.db.get(id);

        return updatedTrucks;
    },
});

export const deleteTruck = mutation({
    args: { id: v.id('trucks')},
    async handler(ctx, { id }) {
        await ctx.db.delete(id);
    },
});