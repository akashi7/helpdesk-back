import { db } from "../config/database";
import { nexmo } from "../config/nexmo";
import cloudinary from "../config/cloudinary";


const uploadFile = async (file) => {
  try {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      const image = await cloudinary.uploader.upload(file.tempFilePath, (results) => results);
      file = image.secure_url;
      return file;
    }

  } catch (err) {
    console.log('err', err);
  }

};

class staffController {

  //finance 

  static financeRequests(req, res) {
    let destination = "finance";
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE destination=?", [destination], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              data: { finance: result }
            });
          }
          connection.release();
        });
      }
    });
  }
  // finance view request ()

  static financeViewRequest(req, res) {
    const { id } = req.query;

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE id=?", [id], (err, result) => {
          if (err) console.log("Error", err);
          else {
            let status = 'viewed';
            connection.query("UPDATE services SET status=? WHERE id=?", [status, id], (err, results) => {
              if (err) console.log("Error", err);
              else {
                res.send({
                  status: 200,
                  data: { fdata: result }
                });
              }
              connection.release();
            });
          }
        });
      }
    });

  }

  //finance sends to waden 

  static financeSendToWaden(req, res) {

    const { full_names, occupation } = req.staff;
    const { regno, service, phone, formslip, department, year, tel } = req.query;
    const qrcode = `${full_names} from ${occupation}`;
    const status = 'not viewed';
    const destination = 'waden';
    let date = new Date();
    let time = date.toLocaleString();

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("INSERT INTO services SET?", {
          service,
          phone,
          regno,
          qrcode,
          destination,
          status,
          time,
          formslip,
          department, year
        }, (err, result) => {
          if (err) console.log("Error", err);
          else {
            const Tel = `25${tel}`;
            const from = `${occupation}`;
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
              connection.release();
            });
          }

        });
      }
    });


  }

  //waden

  static wadenRequests(req, res) {
    let destination = "waden";
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE destination=?", [destination], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              data: { waden: result }
            });
          }
          connection.release();
        });
      }
    });
  }

  //waden view request

  static wadenViewRequest(req, res) {
    const { id } = req.query;

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE id=?", [id], (err, result) => {
          if (err) console.log("Error", err);
          else {
            let status = 'viewed';
            connection.query("UPDATE services SET status=? WHERE id=?", [status, id], (err, results) => {
              if (err) console.log("Error", err);
              else {
                res.send({
                  status: 200,
                  data: { wadendata: result }
                });
              }
              connection.release();
            });
          }
        });
      }
    });
  }

  //waden send to librarian

  static wadenSendToLibrarian(req, res) {
    const { regno, service, phone, formslip, department, year, tel } = req.query;
    const { full_names, occupation } = req.staff;
    const qrcode = `${full_names} from ${occupation}`;
    const status = 'not viewed';
    const destination = 'library';
    let date = new Date();
    let time = date.toLocaleString();

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("INSERT INTO services SET?", {
          service,
          phone,
          regno,
          destination,
          status,
          time,
          formslip,
          qrcode,
          department, year
        }, (err, result) => {
          if (err) console.log("Error", err);
          else {
            const Tel = `25${tel}`;
            const from = `${occupation}`;
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
              connection.release();
            });
          }

        });
      }
    });
  }

  //librarian

  static librarianRequests(req, res) {
    let destination = "library";
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE destination=?", [destination], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              data: { library: result }
            });
          }
          connection.release();
        });
      }
    });
  }

  //library view request

  static libraryViewRequest(req, res) {
    const { id } = req.query;

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE id=?", [id], (err, result) => {
          if (err) console.log("Error", err);
          else {
            let status = 'viewed';
            connection.query("UPDATE services SET status=? WHERE id=?", [status, id], (err, results) => {
              if (err) console.log("Error", err);
              else {
                res.send({
                  status: 200,
                  data: { libdata: result }
                });
              }
              connection.release();
            });
          }
        });
      }
    });
  }

  //library send to HOD

  static librarySendtoHOD(req, res) {
    const { regno, service, phone, department, formslip, year, tel } = req.query;
    const { full_names, occupation } = req.staff;
    const qrcode = `${full_names} from ${occupation}`;
    const status = 'not viewed';
    const destination = 'HOD';
    let date = new Date();
    let time = date.toLocaleString();

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("INSERT INTO services SET?", {
          service,
          phone,
          regno,
          destination,
          status,
          time,
          qrcode,
          department,
          formslip, year
        }, (err, result) => {
          if (err) console.log("Error", err);
          else {
            const Tel = `25${tel}`;
            const from = `${occupation}`;
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
              connection.release();
            });
          }
          connection.release();
        });
      }
    });
  }

  // HOD

  static HODRequests(req, res) {
    let destination = "HOD";
    const { department } = req.staff;
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE destination=? AND department=?", [destination, department], (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              data: { HOD: result }
            });
          }
          connection.release();
        });
      }
    });
  }

  //HOD view request

  static HODviewRequest(req, res) {
    const { id } = req.query;

    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE id=?", [id], (err, result) => {
          if (err) console.log("Error", err);
          else {
            let status = 'viewed';
            connection.query("UPDATE services SET status=? WHERE id=?", [status, id], (err, results) => {
              if (err) console.log("Error", err);
              else {
                res.send({
                  status: 200,
                  data: { hodData: result }
                });
              }
              connection.release();
            });
          }
        });
      }
    });
  }

  //HOD sent requested file

  static async HODsendFile(req, res) {
    const { regno, service, phone, year } = req.query;
    const { file = {} } = req.files || {};

    const Tel = `25${phone}`;

    const File = await uploadFile(file);

    if (File) {

      db.getConnection((err, connection) => {
        if (err) console.log("Error", err);
        else {
          connection.query("INSERT INTO results SET?", {
            regno,
            service,
            file_url: File,
            year
          }, (err, result) => {
            if (err) console.log("Error", err);
            else {
              const from = 'IPRC  help-desk';
              const to = Tel;
              const text = `Dear student with RegNo ${regno} go to dashboard and retrieve your ${service} file`;

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
                connection.release();
              });

            }
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

  //staff reject requests

  static financeRejectRequest(req, res) {
    const { full_names, occupation } = req.staff;
    const { regno, service, phone } = req.query;

    const Tel = `25${phone}`;

    const from = 'IPRC  help-desk';
    const to = Tel;
    const text = `Dear student with RegNo ${regno} your ${service} request was denied due to Wrong information provide` + `
      please try again. From ${full_names} of ${occupation} DEP
    `;

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

  static wadenRejectRequest(req, res) {
    const { full_names, occupation } = req.staff;
    const { regno, service, phone } = req.query;

    const Tel = `25${phone}`;

    const from = 'IPRC  help-desk';
    const to = Tel;
    const text = `Dear student with RegNo ${regno} your ${service} request was denied due to Hostel fee issues` + `
    Please resolve issue and try again . From ${full_names} of ${occupation} DEP
    `;

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

  static libraryRejectRequest(req, res) {
    const { full_names, occupation } = req.staff;
    const { regno, service, phone } = req.query;

    const Tel = `25${phone}`;

    const from = 'IPRC  help-desk';
    const to = Tel;
    const text = `Dear student with RegNo ${regno} your ${service} request was denied due to Book issues in library` + `
    . From ${full_names} of ${occupation} DEP
    `;

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

}


export default staffController;
