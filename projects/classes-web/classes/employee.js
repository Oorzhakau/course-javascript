export class Employee {
  type = 'Employee';
  constructor(name, position, salary, department) {
    this.name = name;
    this.position = position;
    this.salary = salary;
    this.department = department;
    this.id = Date.now().toString();
  }
  getInfo() {
    console.log(`Name: ${this.name}, Position: ${this.position}, Salary: ${this.salary}`)
  };
};
