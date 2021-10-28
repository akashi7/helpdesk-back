import Joi from "joi";

let String = Joi.string().required();

const appSchema = {
  registerStudent: Joi.object(
    {
      regno: String.error(new Error("RegNo is required"))
    }
  ),
  studentInfo: Joi.object({
    phone: String.regex(/^[0-9]+$/).max(10).min(10).error(new Error("Tel must be 10 numbers")),
    full_names: String.max(20).regex(/^[A-Za-z]/).error(new Error("Names must be letters only")),
    password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number'))

  }),
  completeRegistration: Joi.object({
    password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number'))
  }),
  studentLogin: Joi.object(
    {
      regno: String.error(new Error("Regno is required")),
      password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number'))
    }
  ),
  staffRegister: Joi.object({
    full_names: String.max(20).regex(/^[A-Za-z]/).error(new Error("Names must be letters only")),
    password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number')),
    occupation: String.error(new Error("Occupation is required"))
  }),
  staffLogin: Joi.object({
    code: String.regex(/^[0-9]+$/).error(new Error("Code must be numbers")),
    password: String.min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).error(new Error('Password must be 6 characters long with a capital letter and a number'))
  })
};

export { appSchema };