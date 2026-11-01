
import express from 'express';
import cors from 'cors';
import dns from "dns";
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





// const app=express();
// dns.setServers(["8.8.8.8", "8.8.4.4"]);
// configDotenv(); //load .env file
// const port=process.env.PORT || 3000;


import userRoute from "./src/routes/user/user.route.js";
import jobRouter from "./src/routes/admin/jobManagement/job.router.js";
import { connectDB } from "./src/config/db.js";
import dns from "dns";



const app = express();
dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

configDotenv();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/user", userRoute);
app.use("/api/admin/job", jobRouter);




// import routes

// import studentRouter from "./src/routes/student/student.route.js"
// import jobApply from "./src/routes/jobApplication/jobApplication.route.js"
// import jobRouter from './src/routes/admin/job.route.js';

// //api
// app.use('/api/user',userRoute);
// app.use('/api/admin',jobRouter)

// // routes declearation

// app.use("/api/students",studentRouter);
// app.use("/api/job", jobApply)




const startServer = async () => {
    try {
        await connectDB();


        //api
        app.use('/api/user', userRoute);
        app.use('/api/admin', jobRouter)
        app.use("/api/admin/applications", ApplyRouterAdmin);
        app.use("/api/student", ApplyRouterStudent);
        app.use("/api/student", studentDataRouter);
        app.get('/', (req, res) => {
            res.send('Hello World');
        })


        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error("Server startup failed");
        process.exit(1);
    }
};

startServer();