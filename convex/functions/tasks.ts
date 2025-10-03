import { query, mutation} from '../_generated/server'
import { v } from 'convex/values'

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('tasks').collect();
    },
});

export const createTasks = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        assignedTo: v.id("drivers"),
        truck: v.id("trucks"),
        dueAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert('tasks', {
      title: args.title,
      description: args.description,
      assignedTo: args.assignedTo,
      truck: args.truck,
      status: "pending",
      dueAt: args.dueAt,
      createdAt: Date.now(),
    });
    // Fire immediate notification
    await ctx.db.insert("notifications", {
      toDriver: args.assignedTo,
      type: "task_assigned",
      payload: { taskId },
      status: "pending",
      sentAt: Date.now(),
    });
    return taskId;
  },
});