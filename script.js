`use strict`;

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const allStudents = [];

function start() {
  console.log("start");
  HTML.list = document.querySelector("#list");
  HTML.dest = document.querySelector("#list tbody");
  HTML.template = document.querySelector("template#student");
  loadJSON();
}

function loadJSON() {
  //   console.log("loadJSON");
  fetch("students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  //   console.log("prepareObjects");
  jsonData.forEach((jsonObject) => {
    let fullname = jsonObject.fullname;
    let house = jsonObject.house;
    // let gender = jsonObject.gender;

    const Student = {
      firstName: "",
      lastName: "",
      middleName: "",
      nickName: "",
      imgName: "",
      house: "",
    };
    const student = Object.create(Student);

    student.firstName = fullname.substring(0, fullname.indexOf(" "));
    student.lastName = fullname.substring(fullname.lastIndexOf(" "));
    student.middleName = fullname.substring(fullname.lastIndexOf(" "), fullname.lastIndexOf(" "));
    student.nickName = "";
    student.imgName = "";
    student.house = house.charAt(0).toUpperCase() + house.substring(1).toLowerCase();
    // student.gender = jsonObject.gender;

    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  //   console.log("displayList");

  HTML.dest.innerHTML = "";

  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  console.log("displayStudent");

  const clone = HTML.template.content.cloneNode(true);

  clone.querySelector("[data-field=first_name]").textContent = student.firstName;
  clone.querySelector("[data-field=last_name]").textContent = student.lastName;
  clone.querySelector("[data-field=middle_name]").textContent = student.middleName;
  clone.querySelector("[data-field=nick_name]").textContent = student.nickName;
  clone.querySelector("[data-field=img_name]").textContent = student.imgName;
  clone.querySelector("[data-field=house]").textContent = student.house;

  HTML.dest.appendChild(clone);
}
