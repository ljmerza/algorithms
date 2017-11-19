
// base car class
abstract class Car{
	public description:string;

	public getDescription():string{
		return this.description;
	}

	public abstract cost():number;

}


// create two car types
class ModelS extends Car{
	public description = 'Model S';

	public cost():number{
		return 73000
	}
}
class ModelX extends Car{
	public description = 'Model X';

	public cost():number{
		return 77000;
	}
}


// create base options
abstract class CarOptions extends Car{
	decoratedCar:Car;
	public abstract getDescription():string;
	public abstract cost(): number;
}


// auto pilot option
class EnhanceAutoPilot extends CarOptions{
	decoratedCar:Car;

	constructor(car:Car){
		super();
		this.decoratedCar = car;
	}

	public getDescription():string{
		return this.decoratedCar.getDescription() + ', Enhanced AutoPilot.';
	}

	public cost():number{
		return this.decoratedCar.cost() + 5000;
	}
}

// rear facing seats option
class RearFacingSeats extends CarOptions{
	decoratedCar:Car;

	constructor(car:Car){
		super();
		this.decoratedCar = car;
	}

	public getDescription():string{
		return this.decoratedCar.getDescription() + ', Rear Facing Seats.';
	}

	public cost():number{
		return this.decoratedCar.cost() + 4000;
	}
}

// create car then add read facing seats and autopilot
// (the decorators) to extend ModelS instance
let myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla);
myTesla = new EnhanceAutoPilot(myTesla);

console.log(myTesla.getDescription())
console.log(myTesla.cost())