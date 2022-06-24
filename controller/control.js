const fs = require("fs");
const path = require("path");
// New Student API Project by Sakhi Larik
const getSingleJSON = function (req, res) {
  let id = Number.parseInt(req.params.id);
  dataFile = fs.readFileSync(path.join(__dirname, "../model", "data.json"),"utf-8");
  dataFile = JSON.parse(dataFile);
  let find = dataFile.find((student) => student.id === id);
  // find = JSON.stringify(find);
    res.json(find);
};
const getCompleteJSON = function (req, res) {
  dataFile = fs.readFileSync(path.join(__dirname, "../model", "data.json"),"utf-8");
  res.json(JSON.parse(dataFile));
};
const getSingleStudent = function (req, res) {
  let id = Number.parseInt(req.params.id);
  dataFile = fs.readFileSync(
    path.join(__dirname, "../model", "data.json"),"utf-8");
  dataFile = JSON.parse(dataFile);
  let result = dataFile.find((student) => student.id === id);
  let array = [
    "id",
    "first_name",
    "last_name",
    "email",
    "gander",
    "username",
    "class",
    "img",
    "password",
    "phone_number",
  ];
  let data = "Data Found: <br />";
  a = 0;
  for (i in result) {
    data += array[a] + " : " + result[i] + "<br/>";
    a++;
  }
  res.send(`<h3>${data}</h3>`);
};

const getAllStudents = function (req, res) {
  dataFile = fs.readFileSync(
    path.join(__dirname, "../model", "data.json"),
    "utf-8"
  );
  dataFile = JSON.parse(dataFile);
  let array = [
    "id",
    "first_name",
    "last_name",
    "email",
    "gander",
    "username",
    "class",
    "img",
    "password",
    "phone_number",
  ];
  let data = "Data Found: <br />";
  a = 0;
  for (i in dataFile) {
    // console.log(dataFile[i]);
    for (x in dataFile[i]) {
      data += array[a] + " : " + dataFile[i][x] + "<br />";
      a++;
    }
    data += "<br / ><br / >";
    a = 0;
  }
  res.send(`<h3>${data}</h3>`);
};

const addStudent = function (req, res) {
  let post = req.body;
  dataFile = fs.readFileSync(
    path.join(__dirname, "../model", "data.json"),
    "utf-8"
  );
  dataFile = JSON.parse(dataFile);
  let maxId = Math.max(...dataFile.map((students) => students.id));
  let newStdnt = {
    id: maxId + 1,
    first_name: post.first_name,
    last_name: post.last_name,
    email: post.email,
    gender: post.gender,
    username: post.username,
    class: post.class,
    img: post.img,
    password: post.password,
    phone_number: post.phone_number,
  };
  dataFile.push(newStdnt);
  fs.writeFile(
    path.join(__dirname, "../model", "data.json"),
    JSON.stringify(dataFile),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      res.redirect("/");

    }
  );
};

const editStudent = function (req, res) {
  let post = req.body;
  let id = Number.parseInt(req.params.id);
  dataFile = fs.readFileSync(
    path.join(__dirname, "../model", "data.json"),
    "utf-8"
  );
  dataFile = JSON.parse(dataFile);
  let selectStdnt = dataFile.find((stdnt) => stdnt.id === id);
  let updateStdnt = {
    id: id,
    first_name: post.first_name,
    last_name: post.last_name,
    email: post.email,
    gender: post.gender,
    username: post.username,
    class: post.class,
    img: post.img,
    password: post.password,
    phone_number: post.phone_number,
  };
  dataFile.splice(dataFile.indexOf(selectStdnt), 1, updateStdnt);
  fs.writeFile(
    path.join(__dirname, "../model", "data.json"),
    JSON.stringify(dataFile),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
};

const deleteStudent = function (req, res) {
  let id = Number.parseInt(req.params.id);
  dataFile = fs.readFileSync(
    path.join(__dirname, "../model", "data.json"),
    "utf-8"
  );
  dataFile = JSON.parse(dataFile);
  let selectStdnt = dataFile.find((stdnt) => stdnt.id === id);
  dataFile.splice(dataFile.indexOf(selectStdnt), 1);
  fs.writeFile(
    path.join(__dirname, "../model", "data.json"),
    JSON.stringify(dataFile),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
};

module.exports = {
  getSingleJSON,
  getAllStudents,
  getCompleteJSON,
  getSingleStudent,
  addStudent,
  editStudent,
  deleteStudent,
};
