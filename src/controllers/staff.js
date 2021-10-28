import { db } from "../config/database";

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
    const { regno, service, phone, formslip } = req.query;
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
          formslip
        }, (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              message: "sent ok"
            });
          }
          connection.release();
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
    const { regno, service, phone, formslip } = req.query;
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
          qrcode
        }, (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              message: "sent ok"
            });
          }
          connection.release();
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
    const { regno, service, phone } = req.query;
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
          qrcode
        }, (err, result) => {
          if (err) console.log("Error", err);
          else {
            res.send({
              status: 200,
              message: "sent ok"
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
    db.getConnection((err, connection) => {
      if (err) console.log("Error", err);
      else {
        connection.query("SELECT * FROM services WHERE destination=?", [destination], (err, result) => {
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
                  data: { librarydata: result }
                });
              }
              connection.release();
            });
          }
        });
      }
    });
  }


}


export default staffController;
