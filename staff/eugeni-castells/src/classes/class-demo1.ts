interface IEmployee {
  name: string;

  promotion(newSalary: number): void;
}

abstract class Employee implements IEmployee {
  protected _id: string;

  constructor(public name: string, public salary: number) {
    this._id = (Math.random() ** 15).toString(36);
  }

  promotion(newSalary: number): void {
    this.salary += newSalary;
  }
}
