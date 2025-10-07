/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Endpoints for managing driver information
 */

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     description: Retrieve all registered drivers in the system.
 *     responses:
 *       200:
 *         description: List of all drivers retrieved successfully.
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
 *                     description: Contact phone number
 *                   email:
 *                     type: string
 *                     description: Driver's email address
 *                   licenseNumber:
 *                     type: string
 *                     description: Driver’s license number
 *                   userId:
 *                     type: string
 *                     description: ID of the user associated with the driver
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date when the driver was added
 *       500:
 *         description: Server error while retrieving drivers
 */

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
 *                 description: Contact phone number
 *               email:
 *                 type: string
 *                 description: Driver's email address
 *               licenseNumber:
 *                 type: string
 *                 description: Driver’s license number
 *               userId:
 *                 type: string
 *                 description: ID of the user associated with the driver
 *     responses:
 *       201:
 *         description: Driver added successfully
 *       400:
 *         description: Invalid driver data
 *       500:
 *         description: Server error while adding driver
 */

/**
 * @swagger
 * /drivers/{driverId}:
 *   put:
 *     summary: Update driver information
 *     tags: [Drivers]
 *     description: Update an existing driver's details.
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               licenseNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error while updating driver
 */

/**
 * @swagger
 * /drivers/{driverId}:
 *   delete:
 *     summary: Delete a driver
 *     tags: [Drivers]
 *     description: Remove a driver by ID.
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
