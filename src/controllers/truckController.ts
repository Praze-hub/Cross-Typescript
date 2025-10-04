import { Request, Response } from "express";
import { getAllTrucks, createTruck, updateTruck, deleteTruck } from '../services/truckService';
import { Id } from "../../convex/_generated/dataModel";



export const getTrucks = async (req: Request, res: Response) => {
    try{
        const trucks = await getAllTrucks();
        res.json(trucks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
};

export const addTruck = async (req: Request, res: Response) => {
    try{
        const { plateNumber, model, mileage } = req.body ?? {};
        if (!plateNumber) {
            return res.status(400).json({error: 'Plate number is required'});
        }
        const truckId = await createTruck(plateNumber, model, mileage);
        res.status(201).json({message: 'Truck created', truckId});

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
};


export const editTruck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: "Truck ID is required" });
    }

    const updated = await updateTruck(id as Id<'trucks'>, updates);
    res.json({ message: "Truck updated", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeTruck = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Truck ID is required" });
    }

    await deleteTruck(id as Id<'trucks'>);
    res.json({ message: "Truck deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

