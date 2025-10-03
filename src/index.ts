import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRoutes'
import { logger } from './middlewares/logger'


const app: Application = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use(logger);

app.get('/', (req: Request, res: Response) => {
    res.send('API is up and running');
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})