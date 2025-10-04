import { Request, Response } from "express";
import { getAllTasks, createTasks, updateTask, deleteTask } from '../services/taskService';
import { error } from "console";
import { Id } from "../../convex/_generated/dataModel";



export const getTasks = async ( req: Request, res: Response) => {
    try{
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};

export const addTask = async (req: Request, res: Response) => {
    try{
        const { title, description, assignedTo, truck, dueAt} = req.body ?? {};
        if(!title || !assignedTo || !truck){
        return res.status(400).json({ error: 'Title, assignedTo, truck are required'});
        }
         const taskId = await createTasks(title, description, assignedTo, truck, dueAt);
         res.status(201).json({message: 'Task assigned', taskId });
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const updated = await updateTask(id as Id<'tasks'>, updates);
    res.json({ message: "Task updated", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    await deleteTask(id as Id<'tasks'>);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

