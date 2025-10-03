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
