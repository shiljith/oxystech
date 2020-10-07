//Install express server
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;
// Serve only the static files form the dist directory
app.use(express.static(__dirname));
bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

const config = {
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	user: "oxystechsolution@gmail.com",
	pass: "Oxystech@123"
};

app.post("/email", (req, res) => {
	console.log(req.body.name);
	const userData = req.body;
  var transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
  var mailOptions = {
    to: config.user,
    subject: userData.subject,
    text:  `Name: ${userData.name}\nEmail: ${userData.email} \nMessage: ${userData.message}\n`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.status(200).json('OK');
    }
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
