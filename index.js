const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = express();
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(3000, () => console.log("listenning to port 3000...")))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const Patient = mongoose.model(
  "Patient",
  new Schema({
    firstName: String,
    lastName: String,
    email: String,
    location: String,
    phoneNumber: Number,
    information: String,
  })
);

app.get("/api/patients", async (req, res) => {
  const patients = await Patient.find();
  res.send(patients);
});

app.post("/api/patients", async (req, res) => {
  const genre = await Patient.findById(req.body.ID);
  if (!genre) return res.status(400).send(error.details[0].message);

  let patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber,
    information: req.body.information,
  });

  patient = await patient.save();
  res.send(patient);
});
