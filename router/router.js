const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  getSingleJSON,
  getAllStudents,
  getCompleteJSON,
  getSingleStudent,
  addStudent,
  editStudent,
  deleteStudent,
} = require("../controller/control");
const rout = function (app) {
  let urlEncodedBoodyPaser = bodyParser.urlencoded({ extended: false });

  app.use("/public", express.static(path.join(__dirname, "../public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../view", "index.html"));
  });

  app.get("/json", getCompleteJSON);

  app.get("/json/:id", getSingleJSON);

  app.get("/student/:id", getSingleStudent);

  app.get("/student", getAllStudents);

  app.post("/addStudent", urlEncodedBoodyPaser, addStudent);

  app.post("/editStudent/:id", urlEncodedBoodyPaser, editStudent);
  
  app.get("/editStudentOfID/:id", (req,res)=>{
    res.sendFile(path.join(__dirname,"../view","editStudent.html"))
  });

  app.get("/delete/Student/:id", urlEncodedBoodyPaser, deleteStudent);

  app.use((req, res) => {
    res.send("404");
  });
};
module.exports = {
  rout,
};
