import { query, mutation} from '../_generated/server'
import { v } from 'convex/values'

export const getAllTheTasks = query({
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
    return {
     message: "Task successfully created",
     task: taskId,
    };
  },
});

export const updateTask = mutation({
    args: {
        id: v.id('tasks'),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        status: v.optional(
            v.union(v.literal('pending'), v.literal('in_progress'), v.literal('done'))
        ),
        dueAt: v.optional(v.number()),
    },
    async handler(ctx, args){

        const {id, title, description, status} = args;

        const updates: Partial<{
            title: string;
            description: string;
            status: "pending" | "in_progress" | "done";
        }> = {};

        if (title) updates.title = title;
        if (description) updates.description = description;
        if (status) updates.status = status;

        await ctx.db.patch(id, updates);

        const updateTask = await ctx.db.get(id);

        return updateTask;
    },
});

export const deleteTask = mutation({
    args: { id: v.id('tasks')},
    async handler(ctx, { id }) {
        await ctx.db.delete(id);
        return id;
    },
});