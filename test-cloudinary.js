import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log(
    "API key:",
    process.env.CLOUDINARY_API_KEY
        ? "Loaded"
        : "Missing"
);
console.log(
    "API secret:",
    process.env.CLOUDINARY_API_SECRET
        ? "Loaded"
        : "Missing"
);

try {

    const result = await cloudinary.uploader.upload(
        "./public/temp/mypicture.jpeg",
        {
            resource_type: "image"
        }
    );

    console.log("================================");
    console.log("SUCCESS");
    console.log("URL:", result.secure_url);
    console.log("Public ID:", result.public_id);
    console.log("================================");

} catch (error) {

    console.log("================================");
    console.log("FAILED");
    console.log("Message:", error?.message);
    console.log("HTTP:", error?.http_code);
    console.log("Name:", error?.name);
    console.log("Code:", error?.code);
    console.log("Keys:", Object.keys(error || {}));
    console.log("Error:", error);
    console.log("================================");

}