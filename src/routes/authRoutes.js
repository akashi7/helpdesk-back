import { Router } from "express";
import authController from "../controllers/auth";
import appHepler from "../middleware/helper";


const authRouter = Router();

//for student

authRouter.post("/schollRegister", authController.StudentRegisterInSchollDatabase);
authRouter.post("/studentRegister", appHepler.registerStudentVal, authController.RegisterStudent);
authRouter.post("/provideInfo", appHepler.StudentInfoVal, authController.StudentEnterInfo);
authRouter.post('/completeRegistration', appHepler.completeRegistrationVal, authController.StudentCompleteRegistration);

//student-login

authRouter.post("/student-login", appHepler.studentLoginVal, authController.studentLogin);

//for staff

authRouter.post('/staffRegister', authController.RegisterStaffMember);

//staff-login
authRouter.post("/staff-login", appHepler.staffLoginVal, authController.staffLogin);


export default authRouter;