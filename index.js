import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRoute from './src/routes/user/user.route.js';
import { connectDB } from './src/config/db.js';
import jobRouter from './src/routes/admin/job.router.js';
// import applicationRoutes from "./routes/admin/applicationRoutes.js";
// import studentApplicationRoutes from "./routes/student/applicationRoutes.js";
// import studentRoutes from "./routes/student/studentRoutes.js";
import ApplyRouterAdmin from './src/routes/admin/applicationRoutes.js';
import ApplyRouterStudent from './src/routes/student/applicationController.js';
import studentDataRouter from './src/routes/student/studentRoutes.js';

const app=express();
configDotenv(); //load .env file
const port=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//api
app.use('/api/user',userRoute);
app.use('/api/admin',jobRouter)
app.use("/api/admin/applications", ApplyRouterAdmin);
app.use("/api/student", ApplyRouterStudent);
app.use("/api/student", studentDataRouter);
app.get('/',(req,res)=>{
 res.send('Hello World');
})


app.listen(port,()=>{
 console.log(`Server is running on port ${port}`);
})