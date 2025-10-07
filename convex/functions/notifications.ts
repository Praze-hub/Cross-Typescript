import { query, mutation, action } from "../_generated/server";
import { convexToJson, v } from 'convex/values';
import { api } from "../_generated/api";
import { Id } from "../../convex/_generated/dataModel";


export const getAllTheNotifications = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('notifications').collect();
  },
});

export const sendNotification = action({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    const notif = await ctx.runQuery(api.functions.notifications.getOneNotification, {
      id: args.notificationId,
    });

    if (!notif) {
      throw new Error('Notification not found');
    }

    if ("type" in notif) {
      console.log(
        `Sending notification ${notif._id} to driver ${notif.toDriver} - type: ${notif.type}`
      );
    } else {
      console.log("Notification has no type:", notif);

    }


    //marking as sent
    await ctx.runMutation(api.functions.notifications.markAsSent, {
      id: args.notificationId,
    });

    return {
      message: "Notification sent successfully",
      notificationId: args.notificationId,
      status: "sent",
      sentAt: new Date().toISOString(),
    };
  },

});

export const getOneNotification = query({
  args: { id: v.optional(v.id('notifications')) },
  handler: async (ctx, args) => {
      if (!args.id){
        console.log("No ID provided");
        return {error: "Notification ID required"};
      }
      const notif = await ctx.db.get(args.id);
      if (!notif){
        return { error: "Notification not found" };
      }

      return notif;

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
  async handler(ctx, args) {
    const { id, status } = args;

    const updates: Partial<
      {
        status: "pending" | "sent" | "failed";

      }> = {};
    if (status) updates.status = status;

    await ctx.db.patch(id, updates);

    const updateNotification = await ctx.db.get(id);
    return updateNotification;
  },
});

export const deleteNotification = mutation({
  args: { id: v.id("notifications") },
  async handler(ctx, { id }) {
    await ctx.db.delete(id);
    return id;
  },
});

