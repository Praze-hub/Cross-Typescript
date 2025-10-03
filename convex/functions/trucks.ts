import { query, mutation } from '../_generated/server'
import { v } from 'convex/values'

export const getAll = query({
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