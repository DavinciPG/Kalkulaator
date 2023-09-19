import express, { Express, Request, Response } from "express";
import cors from "cors";

import calculatorController from "./controllers/calculator"

const app: Express = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/', calculatorController);

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});