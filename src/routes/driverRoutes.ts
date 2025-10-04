import { Router } from 'express';
import { getDrivers, addDriver, editDriver, removeDriver } from '../controllers/driverController';

const router = Router();
router.get('/drivers', getDrivers);
router.post('/drivers', addDriver);
router.put("/drivers/:driverId", editDriver);
router.delete("/drivers/:driverId", removeDriver);
export default router;