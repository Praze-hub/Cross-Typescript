import { Router } from "express";
import { ConvexHttpClient } from "convex/browser";
import { getTrucks, addTruck, editTruck, removeTruck } from "../controllers/truckController";

const router = Router();
const convex = new ConvexHttpClient("https://confident-dove-122.convex.cloud");


/**
 * @swagger
 * tags:
 *   name: Trucks
 *   description: Endpoints for managing truck records
 */

/**
 * @swagger
 * /trucks:
 *   get:
 *     summary: Get all trucks
 *     tags: [Trucks]
 *     description: Retrieve a list of all registered trucks in the system.
 *     responses:
 *       200:
 *         description: A list of trucks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique ID of the truck
 *                   plateNumber:
 *                     type: string
 *                     description: Truck's plate number
 *                   model:
 *                     type: string
 *                     description: Model of the truck
 *                   mileage:
 *                     type: number
 *                     description: Total mileage covered by the truck
 *                   lastMaintenanceAt:
 *                     type: number
 *                     format: timestamp
 *                     description: Timestamp of the truck's last maintenance
 *       500:
 *         description: Server error while retrieving trucks
 */
router.get("/trucks", getTrucks);

/**
 * @swagger
 * /trucks:
 *   post:
 *     summary: Add a new truck
 *     tags: [Trucks]
 *     description: Register a new truck in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *             properties:
 *               plateNumber:
 *                 type: string
 *                 description: Truck's unique plate number
 *               model:
 *                 type: string
 *                 description: Model of the truck
 *               mileage:
 *                 type: number
 *                 description: Current mileage of the truck
 *               lastMaintenanceAt:
 *                 type: number
 *                 format: timestamp
 *                 description: Timestamp of the truck's last maintenance
 *     responses:
 *       201:
 *         description: Truck added successfully
 *       400:
 *         description: Invalid truck data
 *       500:
 *         description: Server error while adding truck
 */
router.post("/trucks", addTruck);

/**
 * @swagger
 * /trucks/{truckId}:
 *   put:
 *     summary: Update a truck
 *     tags: [Trucks]
 *     description: Edit the details of an existing truck by ID.
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the truck
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plateNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               mileage:
 *                 type: number
 *               lastMaintenanceAt:
 *                 type: number
 *                 format: timestamp
 *     responses:
 *       200:
 *         description: Truck updated successfully
 *       404:
 *         description: Truck not found
 *       500:
 *         description: Server error while updating truck
 */
router.put("/trucks/:truckId", editTruck);

/**
 * @swagger
 * /trucks/{truckId}:
 *   delete:
 *     summary: Delete a truck
 *     tags: [Trucks]
 *     description: Remove a truck from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the truck
 *     responses:
 *       200:
 *         description: Truck deleted successfully
 *       404:
 *         description: Truck not found
 *       500:
 *         description: Server error while deleting truck
 */
router.delete("/trucks/:truckId", removeTruck);

export default router;
