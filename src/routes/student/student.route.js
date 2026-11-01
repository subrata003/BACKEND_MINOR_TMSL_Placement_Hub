import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";


import { checkJobEligibility, createProfile, getProfile, updateProfile } from "../../controllers/student/student.controller.js";


const router=Router();

router.route("/createprofile").post(
    verifyJWT,
    upload.fields([
        {
            name:"resume",
            maxCount:1
        },
        {
            name:"profilePhoto",
            maxCount:1
        }
    ]),createProfile
);

router.route("/updateprofile").patch(verifyJWT,upload.single('resume'),updateProfile)
router.route("/getprofile").get(verifyJWT,getProfile);



router.route("jobeligibity/:jobId").get( verifyJWT,checkJobEligibility)






export default router