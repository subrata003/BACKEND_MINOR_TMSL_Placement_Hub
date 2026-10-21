import multer from "multer";
import { ApiError } from "../utils/ApiError.js";


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            `${Date.now()}-${file.originalname}`;

        cb(null, uniqueName);
    }
});


const fileFilter = (req, file, cb) => {

    // console.log("Received field:", file.fieldname);
    // console.log("Received type:", file.mimetype);

    if (file.fieldname === "resume") {

        if (file.mimetype === "application/pdf") {
            return cb(null, true);
        }

        return cb(
            new ApiError(400, "Resume must be a PDF"),
            false
        );
    }

    if (file.fieldname === "profilePhoto") {

        if (
            [
                "image/jpeg",
                "image/png",
                "image/webp"
            ].includes(file.mimetype)
        ) {
            return cb(null, true);
        }

        return cb(
             new  ApiError(400, "Profile photo must be JPG, PNG or WEBP"),
            false
        );
    }

    return cb(
        new ApiError(400, `Unexpected file field: ${file.fieldname}`),
        false
    );
};




const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;