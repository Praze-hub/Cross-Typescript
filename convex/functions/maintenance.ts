import { mainModule } from 'process';
import { query, mutation, action } from '../_generated/server'
import { v } from 'convex/values'
import { api } from "../_generated/api";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('maintenance').collect();
    },
});

export const scheduleMaintenance = mutation({
    args: {
        truck: v.id("trucks"),
        scheduledAt: v.number(),
        notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const maintenanceId = await ctx.db.insert('maintenance', {
    truck: args.truck,
      scheduledAt: args.scheduledAt,
      createdAt: Date.now(),
      done: false,
      notes: args.notes,
    });
    //running schedule job
    await ctx.scheduler.runAt(args.scheduledAt, api.functions.maintenance.startMaintenance, {
        maintenanceId,
    });
    return maintenanceId;
  },
});

// Background job: mark as started/due
export const startMaintenance = mutation({
    args: { maintenanceId: v.id('maintenance')},
    handler: async (ctx, args) => {
        console.log(`Maintenance ${args.maintenanceId} is due!`);

        await ctx.db.patch(args.maintenanceId, {
         done: true,
    });
  
    },
});