import { query, mutation, action } from "../_generated/server";
import { convexToJson, v } from 'convex/values';
import { api } from "../_generated/api";


export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('notifications').collect();
    },
});

export const sendNotification = action({
    args: { notificationId: v.id("notifications")},
    handler: async (ctx, args) => {
        const notif = await ctx.runQuery(api.functions.notifications.getOne, {
            id: args.notificationId,
        });

        if (!notif) throw new Error('Notification not found');
   
    console.log(
        `Sending notification ${notif._id} to driver ${notif.toDriver} - type: ${notif.type}`
    );
    //marking as sent
    await ctx.runMutation(api.functions.notifications.markAsSent, {
        id: args.notificationId,
    });
     },

});

export const getOne = query({
    args: { id: v.id('notifications')},
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const markAsSent = mutation({
    args: { id: v.id('notifications') },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: 'sent', sentAt: Date.now() });
    },
});

export const updateNotification = mutation({
  args: {
    id: v.id("notifications"),
    status: v.optional(
      v.union(v.literal("pending"), v.literal("sent"), v.literal("failed"))
    ),
  },
  async handler(ctx, { id, ...updates }) {
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteNotification = mutation({
  args: { id: v.id("notifications") },
  async handler(ctx, { id }) {
    await ctx.db.delete(id);
    return id;
  },
});

