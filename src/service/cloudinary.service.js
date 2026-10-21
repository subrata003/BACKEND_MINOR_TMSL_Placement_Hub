
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs"

const uploadOnCloudinary = async (
    localFilePath,
    resourceType = "raw"
) => {
    try {

        if (!localFilePath) {
            console.log("Local file path is missing");
            return null;
        }

   

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: resourceType,
                folder: "placementHub/resumeandprofile"
            }
        );

        // console.log("Upload successful");
        // console.log("URL:", response.secure_url);
        // console.log("Public ID:", response.public_id);

        // Delete temporary local file
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log(
                "Temporary file deleted:",
                localFilePath
            );
        }

        return response;

    } catch (error) {

         console.error(
            "Cloudinary upload failed:",
            error.message
        );

        
        // Remove temporary local file
        fs.unlinkSync(localFilePath);

        return null;
    }
};
const deleteFromeCloudinary = async (publicId, resouceType = "raw") => {

    try {
        if (!publicId) {

            return {
                success: false,
                message: " Cloudinary public Id is required "
            }
        }

        const response = await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: resouceType
            }
        );

        console.log("Cloudinary delete result:", response);

        if (response.result === "ok" || response.result === "not found") {

            return {
                success: true,
                message:
                    response.result === "ok" ? "PDF deleted successfully" : " PDF  was already deleted",
                result: response
            };
        }


        return {
            success: false,
            message: "Cloudinary did not delete the file",
            result: response
        };
    } catch (error) {
        console.error(
            "Cloudinary delete failed:",
            error
        );

        return {
            success: false,
            message: "Failed to delete PDF file from Cloudinary",
            error: error?.message || String(error)
        };
    }
}

export {
    uploadOnCloudinary,
    deleteFromeCloudinary
}