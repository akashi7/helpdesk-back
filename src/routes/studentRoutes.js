import { Router } from "express";
import fileUpload from "express-fileupload";
import studentController from "../controllers/student";
import requiredLoggedIn from "../middleware/requiredLogin";

const studentRouter = Router();

studentRouter.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    debug: true,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    abortOnLimit: true,
    responseOnLimit: 'File too large',
  })
);

// transcipts

studentRouter.post('/sendToFinance', requiredLoggedIn.isStudentLoggedIn, studentController.sendFilestoFinance);


// studentRouter.get('/qr', studentController.qrcode);








export default studentRouter;