import { Request, Response } from 'express';
import { getAllUsers, createUser } from '../services/userService';
import { error } from 'console';

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