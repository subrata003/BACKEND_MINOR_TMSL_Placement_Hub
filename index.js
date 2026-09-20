import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import userRoute from './src/routes/user/user.route.js';
import { connectDB } from './src/config/db.js';

const app=express();
configDotenv(); //load .env file
const port=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//api
app.use('/api/user',userRoute);

app.get('/',(req,res)=>{
 res.send('Hello World');
})


app.listen(port,()=>{
 console.log(`Server is running on port ${port}`);
})