import { db } from "../config/database";
import cloudinary from "../config/cloudinary";
import { nexmo } from "../config/nexmo";



const uploadbankSlip = async (slip) => {
  try {
    if (slip.mimetype === 'image/jpeg' || slip.mimetype === 'image/png') {
      const image = await cloudinary.uploader.upload(slip.tempFilePath, (results) => results);
      slip = image.secure_url;
      return slip;
    }

  } catch (err) {
    console.log('err', err);
  }

};
const uploadForm = async (form) => {
  try {
    if (form.mimetype === 'image/jpeg' || form.mimetype === 'image/png') {
      const image = await cloudinary.uploader.upload(form.tempFilePath, (results) => results);
      form = image.secure_url;
      return form;
    }

  } catch (err) {
    console.log('err', err);
  }

};



class studentController {


  static async sendFilestoFinance(req, res) {
    const { bankslip = {}, FormFile = {} } = req.files || {};
    const { phone, regno, department } = req.user;
    const { service, year, tel } = req.query;

    const slipFile = await uploadbankSlip(bankslip);


    let status = 'not viewed';
    let destination = 'finance';

    let date = new Date();
    let time = date.toLocaleString();

    if (slipFile) {
      const formFile = await uploadForm(FormFile);
      if (formFile) {
        db.getConnection((err, connection) => {
          if (err) console.log("Error", err);
          else {
            connection.query("INSERT INTO services SET?", {
              phone,
              regno,
              service,
              status,
              destination,
              bankslip: slipFile,
              formslip: formFile,
              time,
              department,
              year
            }, (err, result) => {
              if (err) console.log("Error", err);
              else {
                const Tel = `25${tel}`;
                const from = 'IPRC student';
                const to = Tel;
                const text = `Student with ${regno} requests ${service} sevice go check `;

                nexmo.message.sendSms(from, to, text, (err, results) => {
                  if (err) {
                    res.send({
                      status: 307,
                      message: "Sending message failed"
                    });
                  }
                  else {
                    res.send({
                      status: 200
                    });
                  }
                });
              }
              connection.release();
            });
          }
        });
      }
      else {
        res.send({
          status: 300,
          message: "Error uploading file check the connection "
        });
      }
    }
    else {
      res.send({
        status: 300,
        message: "Error uploading file check the connection "
      });
    }
  }

  static studentViewAllresults(req, res) {
    const { regno } = req.user;
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM results WHERE regno=?", [regno], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              data: { files: result }
            });
          }
          connection.release();
        });
      }
    });
  }

  static viewFile(req, res) {
    const { id } = req.query;
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM results WHERE id=?", [id], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              data: { file: result }
            });
          }
          connection.release();
        });
      }
    });
  }

}


export default studentController;
