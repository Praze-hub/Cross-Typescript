// driverRoutes.ts
import { Router } from "express";
import { ConvexHttpClient } from "convex/browser";
import { getDrivers, addDriver, editDriver, removeDriver } from "../controllers/driverController";

const router = Router();
const convex = new ConvexHttpClient("https://confident-dove-122.convex.cloud");


/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Endpoints for managing driver information and profiles
 */

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     description: Retrieve a list of all registered drivers in the system.
 *     responses:
 *       200:
 *         description: A list of all drivers retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique ID of the driver
 *                   name:
 *                     type: string
 *                     description: Full name of the driver
 *                   phone:
 *                     type: string
 *                     description: Contact phone number of the driver
 *                   email:
 *                     type: string
 *                     description: Driver’s email address
 *                   licenseNumber:
 *                     type: string
 *                     description: Driver’s license number
 *                   userId:
 *                     type: string
 *                     description: ID of the user who registered the driver
 *       500:
 *         description: Server error while retrieving drivers
 */
router.get("/drivers", getDrivers);

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Add a new driver
 *     tags: [Drivers]
 *     description: Create and register a new driver in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the driver
 *               phone:
 *                 type: string
 *                 description: Contact phone number of the driver
 *               email:
 *                 type: string
 *                 description: Driver’s email address
 *               licenseNumber:
 *                 type: string
 *                 description: Driver’s license number
 *               userId:
 *                 type: string
 *                 description: ID of the user creating this driver record
 *     responses:
 *       201:
 *         description: Driver added successfully
 *       400:
 *         description: Invalid driver data
 *       500:
 *         description: Server error while adding driver
 */
router.post("/drivers", addDriver);

/**
 * @swagger
 * /drivers/{driverId}:
 *   put:
 *     summary: Update a driver’s information
 *     tags: [Drivers]
 *     description: Edit or update the details of an existing driver.
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the driver to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated full name of the driver
 *               phone:
 *                 type: string
 *                 description: Updated contact phone number
 *               email:
 *                 type: string
 *                 description: Updated email address
 *               licenseNumber:
 *                 type: string
 *                 description: Updated driver’s license number
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error while updating driver
 */
router.put("/drivers/:driverId", editDriver);

/**
 * @swagger
 * /drivers/{driverId}:
 *   delete:
 *     summary: Delete a driver
 *     tags: [Drivers]
 *     description: Remove a driver from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the driver to delete
 *     responses:
 *       200:
 *         description: Driver deleted successfully
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error while deleting driver
 */
router.delete("/drivers/:driverId", removeDriver);

export default router;
