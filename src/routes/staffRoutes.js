import { Router } from "express";
import requiredLoggedIn from "../middleware/requiredLogin";
import staffController from "../controllers/staff";
import fileUpload from "express-fileupload";

const staffRouter = Router();

staffRouter.use(
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

//finance

staffRouter.get('/financeRequests', requiredLoggedIn.isStaffLoggedIn, staffController.financeRequests);
staffRouter.get("/financeViewRequest", requiredLoggedIn.isStaffLoggedIn, staffController.financeViewRequest);
staffRouter.post("/financeSendTowaden", requiredLoggedIn.isStaffLoggedIn, staffController.financeSendToWaden);
staffRouter.post("/financereject", requiredLoggedIn.isStaffLoggedIn, staffController.financeRejectRequest);

//waden

staffRouter.get('/wadenRequests', requiredLoggedIn.isStaffLoggedIn, staffController.wadenRequests);
staffRouter.get("/wadenViewRequest", requiredLoggedIn.isStaffLoggedIn, staffController.wadenViewRequest);
staffRouter.post("/wadenSendTolibrary", requiredLoggedIn.isStaffLoggedIn, staffController.wadenSendToLibrarian);
staffRouter.post("/wadenreject", requiredLoggedIn.isStaffLoggedIn, staffController.wadenRejectRequest);

//library

staffRouter.get('/librayRequests', requiredLoggedIn.isStaffLoggedIn, staffController.librarianRequests);
staffRouter.get("/libraryViewRequest", requiredLoggedIn.isStaffLoggedIn, staffController.libraryViewRequest);
staffRouter.post("/librarySendToHod", requiredLoggedIn.isStaffLoggedIn, staffController.librarySendtoHOD);
staffRouter.post("/libraryreject", requiredLoggedIn.isStaffLoggedIn, staffController.libraryRejectRequest);

//hod

staffRouter.get('/hodRequests', requiredLoggedIn.isStaffLoggedIn, staffController.HODRequests);
staffRouter.get('/hodViewRequest', requiredLoggedIn.isStaffLoggedIn, staffController.HODviewRequest);
staffRouter.post("/sendFile", requiredLoggedIn.isStaffLoggedIn, staffController.HODsendFile);



export default staffRouter;