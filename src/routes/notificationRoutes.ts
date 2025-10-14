import { Router } from "express";
import { ConvexHttpClient } from "convex/browser";
import {
  getNotifications,
  triggerNotification,
  editNotification,
  removeNotification
} from "../controllers/notificationController";

const router = Router();
const convex = new ConvexHttpClient("https://confident-dove-122.convex.cloud");


/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Endpoints for managing and sending driver notifications
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     description: Retrieve all notifications or filter by driver.
 *     parameters:
 *       - in: query
 *         name: toDriver
 *         schema:
 *           type: string
 *         description: (Optional) Filter notifications for a specific driver ID
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique ID of the notification
 *                   toDriver:
 *                     type: string
 *                     description: ID of the driver receiving the notification
 *                   type:
 *                     type: string
 *                     description: Notification category (e.g., "task_assigned", "maintenance_alert")
 *                   payload:
 *                     type: object
 *                     description: Additional data associated with the notification
 *                   status:
 *                     type: string
 *                     enum: [pending, sent, failed]
 *                     description: Status of the notification
 *                   sentAt:
 *                     type: number
 *                     description: Timestamp of when the notification was sent (Unix time)
 *       500:
 *         description: Server error while retrieving notifications
 */
router.get("/notifications", getNotifications);

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Trigger a new notification
 *     tags: [Notifications]
 *     description: Create and send a notification to a driver.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toDriver
 *               - type
 *               - payload
 *             properties:
 *               toDriver:
 *                 type: string
 *                 description: ID of the driver to send notification to
 *               type:
 *                 type: string
 *                 description: Type/category of the notification
 *               payload:
 *                 type: object
 *                 description: Arbitrary data payload for the notification
 *     responses:
 *       201:
 *         description: Notification successfully created and sent
 *       400:
 *         description: Invalid or missing data
 *       500:
 *         description: Server error while creating notification
 */
router.post("/notifications", triggerNotification);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   put:
 *     summary: Update a notification
 *     tags: [Notifications]
 *     description: Modify notification status or payload by its ID.
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the notification
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, sent, failed]
 *                 description: Updated status of the notification
 *               payload:
 *                 type: object
 *                 description: Updated payload data
 *               sentAt:
 *                 type: number
 *                 description: Updated timestamp when notification was sent
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error while updating notification
 */
router.put("/notifications/:notificationId", editNotification);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     description: Remove a notification record from the system.
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error while deleting notification
 */
router.delete("/notifications/:notificationId", removeNotification);

export default router;
