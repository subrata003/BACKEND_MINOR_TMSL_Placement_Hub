import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
dotenv.config({ path: './.env' })


// configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log(" cloudinary cloud name",process.env.CLOUDINARY_CLOUD_NAME);
console.log("cld key",process.env.CLOUDINARY_API_KEY);
console.log("cld api secret",process.env.CLOUDINARY_API_SECRET);



export{cloudinary}