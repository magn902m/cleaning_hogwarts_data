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
  console.log("loadJSON");
  fetch("students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  console.log("prepareObjects");

  displayList();
}
function displayList() {
  console.log("displayList");

  HTML.dest.innerHTML = "";

  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  console.log("displayStudent");

  const clone = HTML.template.content.cloneNode(true);

  clone.querySelector("[data-field=first_name]").textContent = student.firstName;

  HTML.dest.appendChild(clone);
}
