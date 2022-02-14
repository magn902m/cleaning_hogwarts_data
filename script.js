`use strict`;

// Array for all students
const allStudents = [];

// Student object
const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  gender: "",
  imgSrc: "",
  house: "",
};
// API url
const urlStudentList = "https://petlatkea.dk/2021/hogwarts/students.json";

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  loadJSON();
}

// MVP: Controller
// Fetch student list JSON
async function loadJSON() {
  console.log("loadJSON");
  const jsonData = await fetch(urlStudentList);
  studentData = await jsonData.json();
  console.table(studentData);
  makeStudents();
}

// MVP: Model
// Make students
function makeStudents() {
  console.log("makeStudents");
  studentData.forEach((elm) => {
    const student = Object.create(Student);

    // Variables for holding data and trim data for whitespace
    let fullName = elm.fullname.trim();
    let house = elm.house.trim();
    let gender = elm.gender.trim();

    // -- Setting values for the object --
    // Firstname: take the first char and set it to upper case and set the rest to lower case.
    student.firstName =
      fullName.substring(0, 1).toUpperCase() +
      fullName.substring(1, fullName.indexOf(" ")).toLowerCase();

    // Lastname: take the first char in the lastname and make it upper case and the rest lower case.
    student.lastName =
      fullName
        .substring(fullName.lastIndexOf(" ") + 1, fullName.lastIndexOf(" ") + 2)
        .toUpperCase() + fullName.substring(fullName.lastIndexOf(" ") + 2).toLowerCase();

    // Middlename: take the middlename and make the first char upper case and the rest lower case.
    student.middleName =
      fullName
        .substring(fullName.indexOf(" "), fullName.lastIndexOf(" "))
        .trim()
        .substring(0, 1)
        .toUpperCase() +
      fullName
        .substring(fullName.indexOf(" "), fullName.lastIndexOf(" "))
        .trim()
        .substring(1)
        .toLowerCase();
    // student.middleName =
    //   fullName.substring(fullName.indexOf(" "), fullName.lastIndexOf(" ")) +
    //   fullName.substring(0, 1).toUpperCase() +
    //   fullName.substring(1).toLowerCase();

    // Nickname: find the nickname with "" in a if statement.
    if (fullName.includes(`"`)) {
      student.nickName = fullName.substring(fullName.indexOf(`"`) + 1, fullName.lastIndexOf(`"`));
      student.middleName = "";
    }

    // Gender: first char set to upper case, rest to lower case.
    student.gender = gender.charAt(0).toUpperCase() + gender.substring(1).toLowerCase();

    // Imgsrc: find the destation and make it all to lower case.
    student.imgSrc = `./images/${fullName.substring(0, fullName.indexOf(" ")).toLowerCase()}_.png`;
    student.imgSrc = `./images/${
      fullName
        .substring(fullName.lastIndexOf(" ") + 1, fullName.lastIndexOf(" ") + 2)
        .toLowerCase() + fullName.substring(fullName.lastIndexOf(" ") + 2).toLowerCase()
    }_${fullName.substring(0, 1).toUpperCase().toLowerCase()}.png`;

    // House: set the first char to upper case and the rest to lower case.
    student.house = house.charAt(0).toUpperCase() + house.substring(1).toLowerCase();

    allStudents.push(student);
  });
  showAllStudents();
}

// MVP: View
function showAllStudents() {
  console.table(allStudents);
}
