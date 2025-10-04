import { ConvexHttpClient } from 'convex/browser';
import  { api }  from '../../convex/_generated/api';
import { Id } from "../../convex/_generated/dataModel"; 


const convex = new ConvexHttpClient('http://localhost:3210')

export const getAllUsers = async () => {
    return await convex.query(api.functions.users.getAll, {});
};

export const createUser = async (name: string, email: string, role: "admin" | "manager" | "driver") => {
    await convex.mutation(api.functions.users.createUser, { name, email, role });
}

export const updateUser = async (
  id: Id<"users">,
  updates: {
    name?: string;
    email?: string;
    role?: "admin" | "manager" | "driver";
  }
) => {
  return await convex.mutation(api.functions.users.updateUser, {
    id,
    ...updates,
  });
};

export const deleteUser = async (id: Id<"users">) => {
  return await convex.mutation(api.functions.users.deleteUser, { id });
};