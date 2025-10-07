import { mainModule } from 'process';
import { query, mutation, action } from '../_generated/server'
import { v } from 'convex/values'
import { api } from "../_generated/api";

export const getAllTheMaintenance = query({
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
      status: "scheduled",
      notes: args.notes,
    });
    //running schedule job
    await ctx.scheduler.runAt(args.scheduledAt, api.functions.maintenance.startMaintenance, {
        maintenanceId,
    });
    return {
      messsage: "Maintenance successfully scheduled",
      maintenanceId
    };
  },
});

// Background job: mark as started/due
export const startMaintenance = mutation({
    args: { maintenanceId: v.id('maintenance')},
    handler: async (ctx, args) => {
        console.log(`Maintenance ${args.maintenanceId} is due!`);

        await ctx.db.patch(args.maintenanceId, {
         status: "in_progress",
    });
    return {
      message: "Maintenance successfully started",
    };
  
    },
});

export const completeMaintenance = mutation({
  args: { maintenanceId: v.id("maintenance")},
  handler: async (ctx, args) => {
    await ctx.db.patch(args.maintenanceId, {
      status: "completed",
      completedAt: Date.now(),
    });
    return { message: "Maintenance marked as completed"};
  },
});

export const updateMaintenance = mutation({
  args: {
    id: v.id("maintenance"),
    done: v.optional(v.boolean()),
    notes: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const {id,done, notes} = args;

    const updates: Partial<{
      done: boolean;
      notes: string;
    }> = {};

    if (done) updates.done = done;
    if (notes) updates.notes = notes;

    await ctx.db.patch(id, updates);
    
    const updatedMaintenance = await ctx.db.get(id);

    return updatedMaintenance;
  },
});

export const deleteMaintenance = mutation({
  args: { id: v.id("maintenance") },
  async handler(ctx, { id }) {
    await ctx.db.delete(id);
    return id;
  },
});