import { Director } from "./classes/director";
import { Manager } from "./classes/manager";
import { Employee } from "./classes/employee";

const form = document.getElementById('form');
const employeesContainer = document.getElementById('employees_container');
const allEmployees = [];
const employees = {
  special: Employee,
  director: Director,
  manager: Manager,
}

function renderEmployees() {
  employeesContainer.innerHTML = '';
  for (const employee of allEmployees) {
    employeesContainer.innerHTML += `
    <div class="emp">
      <span>${employee.name}</span>
      <span>${employee.salary}</span>
      <span>${employee.position}</span>
      <span>${employee.type}</span>
      <button data-role="detail" data-id="${employee.id}">Показать детали</button>
    </div>
    `
  }
};

employeesContainer.addEventListener('click', e => {
  const role = e.target.getAttribute('data-role');
  const id = e.target.getAttribute('data-id');

  const targetEmployee = allEmployees.find(employees => employees.id === id);
  if (role === 'detail') {
    targetEmployee.getInfo();
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const {
    name : {value: nameValue},
    salary: {value: salaryValue},
    position: {value: positionValue },
    type: {value: typeValue}
  } = this.elements;

  const employee = new employees[typeValue](nameValue, positionValue, salaryValue);
  allEmployees.push(employee);
  renderEmployees();
});