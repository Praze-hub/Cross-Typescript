import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRoutes'
import driverRoutes from "./routes/driverRoutes";
import truckRoutes from "./routes/truckRoutes";
import taskRoutes from "./routes/taskRoutes";
import maintenanceRoutes from "./routes/maintenanceRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import { logger } from './middlewares/logger'


const app: Application = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use("/api", driverRoutes);
app.use("/api", truckRoutes);
app.use("/api", taskRoutes);
app.use("/api", maintenanceRoutes);
app.use("/api", notificationRoutes);
app.use(logger);

app.get('/', (req: Request, res: Response) => {
    res.send('API is up and running');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})