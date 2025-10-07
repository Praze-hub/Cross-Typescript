import { Router } from "express";
import { getTasks, addTask, editTask, removeTask } from "../controllers/taskController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints for managing driver and truck tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     description: Retrieve a list of all tasks in the system.
 *     responses:
 *       200:
 *         description: A list of tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique ID of the task
 *                   title:
 *                     type: string
 *                     description: Title of the task
 *                   description:
 *                     type: string
 *                     description: Task details or notes
 *                   assignedTo:
 *                     type: string
 *                     nullable: true
 *                     description: ID of the driver assigned to the task
 *                   truck:
 *                     type: string
 *                     nullable: true
 *                     description: ID of the truck linked to this task
 *                   status:
 *                     type: string
 *                     enum: [pending, in_progress, done]
 *                     description: Current task status
 *                   dueAt:
 *                     type: number
 *                     format: timestamp
 *                     nullable: true
 *                     description: Unix timestamp representing the task's due date
 *                   createdAt:
 *                     type: number
 *                     format: timestamp
 *                     description: Timestamp of task creation
 *       500:
 *         description: Server error while retrieving tasks
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     description: Add a new task, optionally assigning it to a driver and a truck.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *               description:
 *                 type: string
 *                 description: Optional task details or notes
 *               assignedTo:
 *                 type: string
 *                 nullable: true
 *                 description: ID of the driver assigned to the task
 *               truck:
 *                 type: string
 *                 nullable: true
 *                 description: ID of the truck assigned to the task
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 description: Initial task status
 *               dueAt:
 *                 type: number
 *                 format: timestamp
 *                 description: Optional Unix timestamp representing the due date
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid task data
 *       500:
 *         description: Server error while creating task
 */
router.post("/tasks", addTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     description: Modify the details of an existing task by ID.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *               truck:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *               dueAt:
 *                 type: number
 *                 format: timestamp
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error while updating task
 */
router.put("/tasks/:taskId", editTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     description: Remove a task from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the task
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error while deleting task
 */
router.delete("/tasks/:taskId", removeTask);

export default router;
