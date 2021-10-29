import { db } from "../config/database";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

class authController {

  //for students

  static StudentRegisterInSchollDatabase(req, res) {
    const { regno } = req.body;
    db.getConnection((err, connection) => {
      if (err) console.log("err", err);
      else {
        connection.query("SELECT * FROM  students WHERE regno=?", [regno], (err, result) => {
          if (err) console.log("err", err);
          else if (result.length > 0) {
            res.send({
              status: 302,
              message: "Student arleady registered"
            });
          }
          else {
            res.send({
              status: 200,
              regno
            });
          }
          connection.release();
        });
      }
    });
  }

  static RegisterStudent(req, res) {
    const { regno } = req.body;
    db.getConnection((err, connection) => {
      if (err) console.log("err", err);
      else {
        connection.query("SELECT * FROM  sch_students WHERE regno=?", [regno], (err, result) => {
          if (err) console.log("err", err);
          else if (result.length === 0) {
            res.send({
              status: 205,
              message: "Can't find student "
            });
          }
          else {
            res.send({
              status: 200,
              regno
            });
          }
          connection.release();
        });
      }
    });
  }

  static StudentEnterInfo(req, res) {
    const { phone, full_names, department } = req.body;
    const { regno } = req.query;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.send({
        status: 205,
        message: "Passwords do not match"
      });
    }
    else {
      db.getConnection(async (err, connection) => {
        if (err) console.log("err", err);
        else {
          const hashedPassword = await hash(password, 8);
          connection.query("INSERT INTO students SET?", {
            regno,
            phone,
            full_names,
            password: hashedPassword,
            department
          }, (err, results) => {
            if (err) console.log("err", err);
            else {
              const token = sign({ phone, regno, department }, process.env.JWT_SECRET, { expiresIn: "5d" });
              res.send({
                status: 200,
                message: "Student information saved",
                token
              });
            }
            connection.release();
          });
        }
      });
    }
  }

  static StudentCompleteRegistration(req, res) {

    const { password, confirmPassword } = req.body;
    const { regno } = req.query;

    if (password !== confirmPassword) {
      res.send({
        status: 205,
        message: "Passwords do not match"
      });
    }
    else {
      db.getConnection(async (err, connection) => {
        if (err) console.log("err", err);
        else {
          const hashedPassword = await hash(password, 8);
          connection.query("UPDATE students SET password=? WHERE regno=? ", [hashedPassword, regno], (err, result) => {
            if (err) console.log("err", err);
            else {
              res.send({
                status: 200,
                message: "Registeration complete "
              });
            }
            connection.release();
          });
        }
      });
    }
  }

  //student-login

  static studentLogin(req, res) {

    const { regno, password } = req.body;

    db.getConnection((err, connection) => {
      if (err) console.log("err", err);
      else {
        connection.query("SELECT * FROM students WHERE regno=?", [regno], async (err, result) => {
          if (err) console.log("err", err);
          else if (result.length === 0) {
            res.send({
              status: 205,
              message: "Student was not found"
            });
          }
          else {
            if (!(await compare(password, result[0].password))) {
              res.send({
                status: 207,
                message: "Wrong password"
              });
            }
            else {
              const { phone, regno, department } = result[0];
              const token = sign({ phone, regno, department }, process.env.JWT_SECRET, { expiresIn: "5d" });
              res.send({
                status: 200,
                message: "logged in ok",
                token
              });
            }
            connection.release();
          }
        });
      }
    });


  }

  //for staff

  static RegisterStaffMember(req, res) {
    const { full_names, occupation, password, confirmPassword, department } = req.body;
    if (password !== confirmPassword) {
      res.send({
        status: 205,
        message: "Passwords do not match"
      });
    }
    else {
      db.getConnection(async (err, connection) => {
        if (err) console.log("err", err);
        else {
          let hashedPassword = await hash(password, 8);
          connection.query("INSERT INTO staff SET?", {
            full_names,
            occupation,
            password: hashedPassword,
            department
          }, (err, result) => {
            if (err) console.log("err", err);
            else {
              res.send({
                status: 200,
                message: "staff created ok"
              });
            }
            connection.release();
          });
        }
      });
    }
  }

  //staff-login

  static staffLogin(req, res) {
    const { code, password } = req.body;

    db.getConnection((err, connection) => {
      if (err) console.log("err", err);
      else {
        connection.query("SELECT * FROM staff WHERE code=?", [code], async (err, result) => {
          if (err) console.log("err", err);
          else if (result.length === 0) {
            res.send({
              status: 205,
              message: "Staff member was not found"
            });
          }
          else {
            if (!(await compare(password, result[0].password))) {
              res.send({
                status: 207,
                message: "Wrong password"
              });
            }
            else {
              if (code === '101') {
                const { code, occupation, full_names } = result[0];
                const token = sign({ occupation, code, full_names }, process.env.JWT_SECRET, { expiresIn: "5d" });
                res.send({
                  status: 201,
                  message: " waden logged in ok",
                  token
                });
              }
              if (code === '102') {
                const { code, occupation, full_names } = result[0];
                const token = sign({ occupation, code, full_names }, process.env.JWT_SECRET, { expiresIn: "5d" });
                res.send({
                  status: 202,
                  message: " library logged in ok",
                  token
                });
              }
              if (result[0].occupation === 'HOD') {
                const { code, occupation, full_names, department } = result[0];
                const token = sign({ occupation, code, full_names, department }, process.env.JWT_SECRET, { expiresIn: "5d" });
                res.send({
                  status: 203,
                  message: "HOD logged in ok",
                  token
                });
              }
              if (code === '104') {
                const { code, occupation, full_names } = result[0];
                const token = sign({ occupation, code, full_names }, process.env.JWT_SECRET, { expiresIn: "5d" });
                res.send({
                  status: 204,
                  message: "finance logged in ok",
                  token
                });
              }
            }
            connection.release();
          }
        });
      }
    });
  }

}

export default authController;