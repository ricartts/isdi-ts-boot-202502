abstract class Animal {
  age: number;
  constructor(public name: string, age: number) {
    this.age = age;
  }

  getOlder(): number {
    return this.age + 1;
  }
}

type Family = "insect" | "reptile" | "mammal";

interface IFly {
  name: string;
  family: Family;
  fly(): void;
}

class Bird extends Animal implements IFly {
  constructor(name: string, age: number, public family: Family) {
    super(name, age);
  }

  fly(): void {
    console.log(`${this.name} is flying!`);
  }
}

const fly = new Bird("Boris", 2, "insect");

fly.fly();
