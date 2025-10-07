import { query, mutation } from '../_generated/server';
import { v } from 'convex/values';

export const getAllDriver = query({
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

export const updateDriver = mutation({

    args: {
        id: v.id('drivers'),
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
        email: v.optional(v.string()),
        licenseNumber: v.optional(v.string()),
    },
    async handler(ctx, args){
        const {id, name, phone, email, licenseNumber} = args;

        const updates: Partial<{
            name: string;
            phone: string;
            email: string;
            licenseNumber: string;
        }> = {};

        if (name) updates.name = name;
        if (phone) updates.phone = phone;
        if (email) updates.email = email;
        if (licenseNumber) updates.licenseNumber = licenseNumber;

        await ctx.db.patch(id, updates);

        const updatedDriver = await ctx.db.get(id);

        return updatedDriver;
    },
});

export const deleteDriver = mutation({
    args: { id: v.id('drivers')},
    async handler(ctx, { id} ){
        await ctx.db.delete(id);
        return id;
    },
});