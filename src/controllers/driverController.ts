import { Request, Response } from "express";
import { getAllDrivers, createDriver, updateDriver, deleteDriver } from '../services/driverService';
import { error } from "console";
import { Id } from "../../convex/_generated/dataModel";


export const getDrivers = async (req: Request, res: Response) => {
    try{
        const drivers = await getAllDrivers();
        res.json(drivers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
};

export const addDriver = async (req: Request, res: Response) => {
    try{
        const {name, phone, email, licenseNumber, userId} = req.body ?? {};
        if (!name || !phone) {
            return res.status(400).json({error: 'Name and phone are required'});
        }
        const driverId = await createDriver(name, phone, email, licenseNumber, userId);
        res.status(201).json({ message: 'Driver created', driverId});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
};

export const editDriver = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const updates = req.body;
        if (!id){
            return res.status(400).json({ error: 'Driver ID is required'});
        }
        const driverId = id as Id<'drivers'>;
        const updateDriverId = await updateDriver(driverId, updates);
        res.json({ message: 'Driver updated', driverId});

    } catch (err){
        res.status(500).json({ error: 'Server error'});
    }
};

export const removeDriver = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        if (!id){
            return res.status(400).json({error: 'Driver ID is required'});
        }

        // Cast to Convex ID type
        const driverId = id as Id<'drivers'>;

        const deletedId = await deleteDriver(driverId);

        res.json({message: 'Driver deleted', driverId: deletedId});
    } catch (err){
        res.status(500).json({error: 'Server error'});
    }
};