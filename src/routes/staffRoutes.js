import { Router } from "express";
import requiredLoggedIn from "../middleware/requiredLogin";
import staffController from "../controllers/staff";

const staffRouter = Router();

//finance

staffRouter.get('/financeRequests', requiredLoggedIn.isStaffLoggedIn, staffController.financeRequests);
staffRouter.get("/financeViewRequest", requiredLoggedIn.isStaffLoggedIn, staffController.financeViewRequest);
staffRouter.post("/financeSendTowaden", requiredLoggedIn.isStaffLoggedIn, staffController.financeSendToWaden);

//waden

staffRouter.get('/wadenRequests', requiredLoggedIn.isStaffLoggedIn, staffController.wadenRequests);
staffRouter.get("/wadenViewRequest", requiredLoggedIn.isStaffLoggedIn, staffController.wadenViewRequest);
staffRouter.post("/wadenSendTolibrary", requiredLoggedIn.isStaffLoggedIn, staffController.wadenSendToLibrarian);

//library

staffRouter.get('/librayRequests', requiredLoggedIn.isStaffLoggedIn, staffController.librarianRequests);
staffRouter.get("/libraryViewRequest", requiredLoggedIn.isStaffLoggedIn, staffController.libraryViewRequest);
staffRouter.post("/librarySendToHod", requiredLoggedIn.isStaffLoggedIn, staffController.librarySendtoHOD);

//hod

staffRouter.get('/hodRequests', requiredLoggedIn.isStaffLoggedIn, staffController.HODRequests);
staffRouter.get('/hodViewRequest', requiredLoggedIn.isStaffLoggedIn, staffController.HODviewRequest);



export default staffRouter;