import { Employee } from './employee';

export class Manager extends Employee {
  type = 'Manager';
  constructor(name, position, salary, department) {
    super(name, position, salary, department);
    this.listEmployees = [];
  }

  getInfoEmployees() {
    console.log(this.listEmployees);
  }

  hireEmployee(employee) {
    this.listEmployees = [...this.listEmployees, employee];
    console.log(`Менеджер ${this.name} нанял сотрудника ${employee.name}`);
  }
  
  fireEmployee(employee) {
    this.listEmployees = this.listEmployees.filter(emp => emp.name !== employee.name);
    console.log(`Менеджер ${this.name} уволил сотрудника ${employee.name}`);
  }
}
