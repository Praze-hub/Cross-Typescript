import { ConvexHttpClient } from 'convex/browser';
import  { api }  from '../../convex/_generated/api';

const convex = new ConvexHttpClient('http://localhost:3210')

export const getAllUsers = async () => {
    return await convex.query(api.functions.users.getAll, {});
};

export const createUser = async (name: string, email: string, role: "admin" | "manager" | "driver") => {
    await convex.mutation(api.functions.users.createUser, { name, email, role });
}