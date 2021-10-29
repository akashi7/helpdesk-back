import express, { json, urlencoded } from "express";
import cors from 'cors';
import morgan from "morgan";

import authRouter from "./routes/authRoutes";
import studentRouter from "./routes/studentRoutes";
import staffRouter from "./routes/staffRoutes";


const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(morgan("dev"));

app.use(json());
app.use(urlencoded({ extended: false }));


app.use("/auth", authRouter);
app.use('/student', studentRouter);
app.use('/staff', staffRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
