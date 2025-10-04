import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const convex = new ConvexHttpClient("http://localhost:3210");

export const getAllNotifications = async () => {
  return await convex.query(api.functions.notifications.getAll, {});
};

export const sendNotification = async (notificationId: Id<'notifications'>) => {
  return await convex.action(api.functions.notifications.sendNotification, {
    notificationId,
  });
};

export const updateNotification = async (
  id: Id<"notifications">,
  updates: { status?: "pending" | "sent" | "failed" }
) => {
  return await convex.mutation(api.functions.notifications.updateNotification, {
    id,
    ...updates,
  });
};

export const deleteNotification = async (id: Id<"notifications">) => {
  return await convex.mutation(api.functions.notifications.deleteNotification, {
    id,
  });
};