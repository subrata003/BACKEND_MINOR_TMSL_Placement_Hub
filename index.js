import express from 'express';
import cors from 'cors';
import dns from "dns";
import { configDotenv } from 'dotenv';
import userRoute from './src/routes/user/user.route.js';
import { connectDB } from './src/config/db.js';


const app=express();
dns.setServers(["8.8.8.8", "8.8.4.4"]);
configDotenv(); //load .env file
const port=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

// import routes

import studentRouter from "./src/routes/student/student.route.js"

//api
app.use('/api/user',userRoute);

// routes declearation

app.use("/api/students",studentRouter);

app.get('/',(req,res)=>{
 res.send('Hello World');
})


app.listen(port,()=>{
 console.log(`Server is running on port ${port}`);
})