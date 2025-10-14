import { Router } from "express";
import { ConvexHttpClient } from "convex/browser";
import {
  getUsers,
  addUser,
  editUser,
  removeUser
} from "../controllers/userController";

const router = Router();
const convex = new ConvexHttpClient("https://confident-dove-122.convex.cloud");


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage application users (admins, managers, and drivers)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     description: Fetch a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the user
 *                   name:
 *                     type: string
 *                     description: Full name of the user
 *                   email:
 *                     type: string
 *                     description: Email address of the user
 *                   role:
 *                     type: string
 *                     enum: [admin, manager, driver]
 *                     description: User role in the system
 *                   createdAt:
 *                     type: integer
 *                     description: Timestamp when the user was created (Date.now)
 *       500:
 *         description: Server error while retrieving users
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Register a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               role:
 *                 type: string
 *                 enum: [admin, manager, driver]
 *                 description: Role assigned to the user
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: integer
 *       400:
 *         description: Invalid input data
 */
router.post("/users", addUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     description: Modify the information of an existing user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, manager, driver]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/users/:userId", editUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Remove a user from the system by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/users/:userId", removeUser);

export default router;
