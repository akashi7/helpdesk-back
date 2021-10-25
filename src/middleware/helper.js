import { appSchema } from "../models/appModel";

class appHepler {

  static registerStudentVal(req, res, next) {
    const { regno } = req.body;
    const { error } = appSchema.registerStudent.validate({ regno });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

  static StudentInfoVal(req, res, next) {
    const { phone, full_names, year } = req.body;
    const { error } = appSchema.studentInfo.validate({ phone, full_names, year });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  };

  static completeRegistrationVal(req, res, next) {
    const { password } = req.body;
    const { error } = appSchema.completeRegistration.validate({ password });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

  static studentLoginVal(req, res, next) {
    const { regno, password } = req.body;
    const { error } = appSchema.studentLogin.validate({ regno, password });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

  static staffLoginVal(req, res, next) {
    const { code, password } = req.body;
    const { error } = appSchema.staffLogin.validate({ code, password });
    if (error) {
      res.send({
        status: 409,
        error: error.message
      });
    }
    else next();
  }

}

export default appHepler;