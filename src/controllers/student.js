import { db } from "../config/database";
import Qrcode from "qrcode";
import cloudinary from "../config/cloudinary";



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

  //transcipt

  // static qrcode(req, res) {
  //   let data = {
  //     name: "Employee Name",
  //     age: 27,
  //     department: "Police",
  //     id: "aisuoiqu3234738jdhf100223"
  //   };
  //   let stringdata = JSON.stringify(data);
  //   Qrcode.toDataURL(stringdata, function (err, url) {
  //     if (err) return console.log("error occured");
  //     console.log(url);
  //     res.send({
  //       status: 200,
  //       url
  //     });
  //   });
  // }

  static async sendFilestoFinance(req, res) {
    const { bankslip = {}, FormFile = {} } = req.files || {};

    const { phone, regno } = req.user;

    const slipFile = await uploadbankSlip(bankslip);

    const { service } = req.query;
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
              time
            }, (err, result) => {
              if (err) console.log("Error", err);
              else {
                res.send({
                  status: 200,
                  message: "Files sent"
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


}


export default studentController;
