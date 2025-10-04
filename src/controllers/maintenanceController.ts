import { Request, Response } from "express";
import { deleteMaintenance, getAllMaintenance, scheduleMaintenance, updateMaintenance } from "../services/maintenanceService";
import { Id } from "../../convex/_generated/dataModel";


export const getMaintenance = async (req: Request, res: Response) => {
    try{
        const maintenance = await getAllMaintenance();
        res.json(maintenance);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
};

export const addMaintenance = async (req: Request, res: Response) => {
    try{
        const { truck, scheduledAt, notes } = req.body ?? {};
        if (!truck || !scheduledAt){
            return res.status(400).json({error: 'Truck and scheduleAt are required'})
        }
        const maintenanceId = await scheduleMaintenance(truck, scheduledAt, notes);
        res.status(201).json({message: 'Maintenance scheduled', maintenanceId});
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};

export const editMaintenance = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const updates = req.body;

        if (!id){
            return res.status(400).json({ error: 'Maintenance ID is required'});

        }
        const maintenanceId = await updateMaintenance(id as Id<'maintenance'>, updates);
        res.json({ message: 'Maintenance updated', maintenanceId});
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
};

export const removeMaintenance = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({error: 'Maintenance ID is required'});

        }
        const deletedId = await deleteMaintenance(id as Id<'maintenance'>);
        res.json({message: 'Maintenance deleted', deletedId});
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};

