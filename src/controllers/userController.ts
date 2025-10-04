import { Request, Response } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import { error } from 'console';
import { Id } from "../../convex/_generated/dataModel";



export const getUsers = (req: Request, res: Response) => {
    try{
        const users = getAllUsers();

        if (!users){
            return res.status(404).json({ error: "No users found" });

        }

        res.json(users);

    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Server error"})
    }

    
};

export const addUser = async (req: Request, res: Response) => {
    try{
        const { name, email, role } = req.body ?? {};
        if (!name || !email || !role ){
            return res.status(400).json({ error: "Name and email are required"});
        }
        await createUser(name, email, role);
        res.status(201).json({ message: "User created successfully" });

    } catch (err){
        console.error(err);
        res.status(500).json({ error: "Server error "})
    }
  


}


export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updated = await updateUser(id as Id<'users'>, updates);
    res.json({ message: "User updated", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await deleteUser(id as Id<'users'>);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

