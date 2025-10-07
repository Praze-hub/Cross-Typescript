import { Router } from "express";
import {
  getMaintenance,
  addMaintenance,
  editMaintenance,
  removeMaintenance
} from "../controllers/maintenanceController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: Endpoints for managing truck maintenance schedules and records
 */

/**
 * @swagger
 * /maintenance:
 *   get:
 *     summary: Get all maintenance records
 *     tags: [Maintenance]
 *     description: Retrieve all truck maintenance records. You can optionally filter by truck ID.
 *     parameters:
 *       - in: query
 *         name: truck
 *         schema:
 *           type: string
 *         description: (Optional) Filter maintenance records for a specific truck ID
 *     responses:
 *       200:
 *         description: List of maintenance records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique ID of the maintenance record
 *                   truck:
 *                     type: string
 *                     description: ID of the truck under maintenance
 *                   scheduledAt:
 *                     type: number
 *                     description: Timestamp (in ms) when maintenance was scheduled
 *                   createdAt:
 *                     type: number
 *                     description: Timestamp when record was created
 *                   completedAt:
 *                     type: number
 *                     description: Timestamp when maintenance was completed
 *                   status:
 *                     type: string
 *                     enum: [scheduled, in_progress, completed]
 *                     description: Current maintenance status
 *                   notes:
 *                     type: string
 *                     description: Optional maintenance notes
 *       500:
 *         description: Server error while retrieving maintenance records
 */
router.get("/maintenance", getMaintenance);

/**
 * @swagger
 * /maintenance:
 *   post:
 *     summary: Schedule a new maintenance record
 *     tags: [Maintenance]
 *     description: Create and save a new maintenance schedule for a truck.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - truck
 *               - scheduledAt
 *             properties:
 *               truck:
 *                 type: string
 *                 description: ID of the truck undergoing maintenance
 *               scheduledAt:
 *                 type: number
 *                 description: Unix timestamp when the maintenance is scheduled
 *               status:
 *                 type: string
 *                 enum: [scheduled, in_progress, completed]
 *                 description: Current maintenance status
 *               notes:
 *                 type: string
 *                 description: Additional notes about the maintenance
 *     responses:
 *       201:
 *         description: Maintenance record added successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error while adding maintenance record
 */
router.post("/maintenance", addMaintenance);

/**
 * @swagger
 * /maintenance/{maintenanceId}:
 *   put:
 *     summary: Update a maintenance record
 *     tags: [Maintenance]
 *     description: Update maintenance details such as status, completion time, or notes.
 *     parameters:
 *       - in: path
 *         name: maintenanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the maintenance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [scheduled, in_progress, completed]
 *                 description: Updated maintenance status
 *               completedAt:
 *                 type: number
 *                 description: Unix timestamp when maintenance was completed
 *               notes:
 *                 type: string
 *                 description: Updated maintenance notes
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 *       404:
 *         description: Maintenance record not found
 *       500:
 *         description: Server error while updating maintenance record
 */
router.put("/maintenance/:maintenanceId", editMaintenance);

/**
 * @swagger
 * /maintenance/{maintenanceId}:
 *   delete:
 *     summary: Delete a maintenance record
 *     tags: [Maintenance]
 *     description: Remove a maintenance record from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: maintenanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the maintenance record
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
 *       404:
 *         description: Maintenance record not found
 *       500:
 *         description: Server error while deleting maintenance record
 */
router.delete("/maintenance/:maintenanceId", removeMaintenance);

export default router;
