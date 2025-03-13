abstract class Vehicle {
  protected _id: string;

  constructor(
    protected chargeWeight: number,
    protected vehicleBaseConsumePer100: number
  ) {
    this._id = (Math.random() ** 15).toString();
  }
  protected greet(): void {
    console.log("Hola");
  }

  calculateFuelDemand(distanceToBeCovered: number): number {
    const chargeFactor: number = 1 + this.chargeWeight * 0.02;

    const adjustedConsumePer100: number =
      chargeFactor * this.vehicleBaseConsumePer100;

    const consumePerKm: number = adjustedConsumePer100 / 100;

    const totalFuelNeeded: number = consumePerKm * distanceToBeCovered;

    return totalFuelNeeded;
  }

  abstract showDetails(): void;
}

type Temperature = "freeze" | "cold" | "warm" | "hot";

interface IRefrigerated {
  optimumTemperature: Temperature;
  actualTemperature: Temperature;

  keepTemperature(): void;
}

type SafetyLevels = "low" | "medium" | "high";

interface IDangerous {
  hazardLevelPermitted: SafetyLevels;

  checkSafety(): void;
}

class Truck extends Vehicle {
  constructor(
    public chargeWeight: number,
    public vehicleBaseConsumePer100: number
  ) {
    super(chargeWeight, vehicleBaseConsumePer100);
  }

  createTemplate(): void {
    super.greet();
  }
  showDetails(): void {
    console.log(
      `Charge weight: ${this.chargeWeight} \n Fuel consume per 100km: ${this.vehicleBaseConsumePer100}`
    );
  }
}

class FreezeTruck extends Vehicle implements IRefrigerated {
  protected _actualTemperature: Temperature;

  constructor(
    public chargeWeight: number,
    public vehicleConsumePer100: number,
    public optimumTemperature: Temperature
  ) {
    super(chargeWeight, vehicleConsumePer100);
    this._actualTemperature = optimumTemperature;
  }

  // private _changeTemperature(temperature: Temperature): void {
  //   this._actualTemperature = temperature;
  // }

  get actualTemperature(): Temperature {
    return this._actualTemperature;
  }

  keepTemperature(): void {
    if (this.actualTemperature !== this.optimumTemperature) {
      this._actualTemperature = this.optimumTemperature;
    }
  }

  showDetails(): void {
    console.log(
      `Charge weight: ${this.chargeWeight} \n Fuel consume per 100km: ${this.vehicleBaseConsumePer100} \n The optimum temperature of this vehicle is ${this.optimumTemperature}`
    );
  }
}

const mercedesIceCreamTruck = new FreezeTruck(500, 25, "freeze");

console.log(mercedesIceCreamTruck);

class HazardTruck extends Vehicle implements IDangerous {
  currentSafety: SafetyLevels;

  constructor(
    chargeWeight: number,
    vehicleBaseConsumePer100: number,
    public hazardLevelPermitted: SafetyLevels
  ) {
    super(chargeWeight, vehicleBaseConsumePer100);
    this.currentSafety = hazardLevelPermitted;
  }

  get vehicleConsume(): number {
    return this.vehicleBaseConsumePer100;
  }
  showDetails(): void {
    console.log(
      `Charge weight: ${this.chargeWeight} \n Fuel consume per 100km: ${this.vehicleBaseConsumePer100} \n The hazard level of the vehicle is ${this.hazardLevelPermitted}`
    );
  }

  updateSafetyLevel(safetyLevel: SafetyLevels): void {
    this.currentSafety = safetyLevel;
  }

  checkSafety(): void {
    if (this.currentSafety !== this.hazardLevelPermitted) {
      this.currentSafety = this.hazardLevelPermitted;
    }
  }
}

interface IEuropeLegalRequirements {
  maximumWeight: number;

  vehicleBaseConsumePer100: number;
}

type EUTemperatureRange<
  Min extends number,
  Max extends number,
  Arr extends number[] = []
> = Arr["length"] extends Max
  ? Min | Arr[number]
  : EUTemperatureRange<Min, Max, [...Arr, Arr["length"]]>;

// Usage
type Range15To50 = EUTemperatureRange<15, 50>;

const gasTruck = new HazardTruck(350, 25, "medium");

console.log(gasTruck.checkSafety());

console.log(gasTruck.vehicleConsume);

const manolo = new Truck(500, 20);

manolo.createTemplate();
