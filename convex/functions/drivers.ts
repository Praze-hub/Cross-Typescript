import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

export const getAll = query({
    args: {},
    handler: async (ctx) =>{
        return await ctx.db.query('drivers').collect();
    },
});

export const createDriver = mutation({
    args: {
        name: v.string(),
        phone: v.string(),
        email: v.optional(v.string()),
        licenseNumber: v.optional(v.string()),
        userId: v.id('users'),
    },
    handler: async (ctx, args) => {
        const driverId = await ctx.db.insert('drivers', {
            ...args,
        });
        return driverId;
    },
});