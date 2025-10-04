import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { omitUndefined } from "../utils/omitUndefined";
import { Id } from "../../convex/_generated/dataModel"; 


const convex = new ConvexHttpClient("http://localhost:3210");

export const getAllTasks = async () => {
    return await convex.query(api.functions.tasks.getAll, {});
};

export const createTasks = async (
    title: string,
    description: string | undefined,
    assignedTo: Id<'drivers'>,
    truck: Id<'trucks'>,
    dueAt?: number
) => {
    return await convex.mutation(api.functions.tasks.createTasks, 
        omitUndefined({
        title,
        description,
        assignedTo,
        truck,
        dueAt,
    })
);
};

export const updateTask = async (
  id: Id<'tasks'>,
  updates: {
    title?: string;
    description?: string;
    status?: "pending" | "in_progress" | "done";
    dueAt?: number;
  }
) => {
  return await convex.mutation(api.functions.tasks.updateTask, {
    id,
    ...updates,
  });
};

export const deleteTask = async (id: Id<'tasks'>) => {
  return await convex.mutation(api.functions.tasks.deleteTask, { id });
};