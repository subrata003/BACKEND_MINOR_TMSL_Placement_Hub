import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

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

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start application
const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error("Server startup failed");
        process.exit(1);
    }
};

startServer();