import { Manager } from './manager';

export class Director extends Manager {
  type = 'Director';
  constructor(name, position, salary, department) {
    super(name, position, salary, department);
    this.listEmployees = [];
  };
}
