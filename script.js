`use strict`;

// Array for all students
const allStudents = [];

// Student object
const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  imgName: "",
  house: "",
};
// API url
const urlStudentList = "https://petlatkea.dk/2021/hogwarts/students.json";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  loadJSON();
}

async function loadJSON() {
  const jsonData = await fetch(urlStudentList);
  studentData = await jsonData.json();
  console.table(studentData);

  makeStudents();
}

function makeStudents() {
  console.log("makeStudents");
  studentData.forEach((elm) => {
    const student = Object.create(Student);
    let fullname = elm.fullname;
    let house = elm.house;
    // let gender = elm.gender;

    student.firstName = fullname.substring(0, fullname.indexOf(" "));
    student.lastName = fullname.substring(fullname.lastIndexOf(" "));
    student.middleName = fullname.substring(fullname.lastIndexOf(" "), fullname.lastIndexOf(" "));
    student.nickName = "";
    student.imgName = "";
    student.house = house.charAt(0).toUpperCase() + house.substring(1).toLowerCase();
    // student.gender = elm.gender;

    allStudents.push(student);
  });

  console.table(allStudents);
}
