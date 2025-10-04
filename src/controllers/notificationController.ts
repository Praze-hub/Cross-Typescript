import { Request, Response } from "express";
import { getAllNotifications, sendNotification, updateNotification, deleteNotification } from "../services/notificationService";
import { Id } from "../../convex/_generated/dataModel";



export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await getAllNotifications();
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const triggerNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.body ?? {};
    if (!notificationId) {
      return res.status(400).json({ error: "notificationId is required" });
    }
    await sendNotification(notificationId);
    res.status(200).json({ message: "Notification sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const editNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    const updated = await updateNotification(id as Id<"notifications">, updates);
    res.json({ message: "Notification updated", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    await deleteNotification(id as Id<"notifications">);
    res.json({ message: "Notification deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

