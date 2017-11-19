interface Subject{
	// let weather station know it needs to notify someone
	registerObserver(o:Observer);
	removeObserver(o:Observer);
	notifyObservers(); // notify any observers of change
}

interface Observer{
	update(temperature:number);
}

class WeatherStation implements Subject {
	private temperature:number;
	private observers:Observer[] = [];

	setTemperature(temp:number){
		console.log('WeatherStation: new temperature measurement: ' + temp);
		this.temperature = temp;
		// after temp change notify all observers
		this.notifyObservers();
	}

	// add to lsit of observers
	public registerObserver(o:Observer){
		this.observers.push(o);
	}

	public removeObserver(o:Observer){
		const index = this.observers.indexOf(o);
		this.observers.splice(index, 1);
	}

	// call update method on all observer objects
	public notifyObservers(){
		for(let observer of this.observers){
			observer.update(this.temperature);
		}
	}
}

// this updates when weatherStation updates it's temp
class TemperatureDisplay implements Observer{
	private subject:Subject;

	// on construction get weatherStation and register with it
	constructor(weatherStation:WeatherStation){
		this.subject = weatherStation;
		weatherStation.registerObserver(this);
	}

	update(temperature:number){
		console.log('Display: ' + temperature);
	}
}

// another observer
class Fan implements Observer{
	private subject:Subject;

	constructor(weatherStation:WeatherStation){
		this.subject = weatherStation;
		weatherStation.registerObserver(this);
	}

	update(temperature:number){
		console.log('Fan: ' + temperature);
	}
}

let weatherStation = new WeatherStation();
let tempDisplay = new TemperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);


weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
