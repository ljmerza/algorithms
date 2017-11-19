var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// base car class
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.getDescription = function () {
        return this.description;
    };
    return Car;
}());
// create two car types
var ModelS = /** @class */ (function (_super) {
    __extends(ModelS, _super);
    function ModelS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'Model S';
        return _this;
    }
    ModelS.prototype.cost = function () {
        return 73000;
    };
    return ModelS;
}(Car));
var ModelX = /** @class */ (function (_super) {
    __extends(ModelX, _super);
    function ModelX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'Model X';
        return _this;
    }
    ModelX.prototype.cost = function () {
        return 77000;
    };
    return ModelX;
}(Car));
// create base options
var CarOptions = /** @class */ (function (_super) {
    __extends(CarOptions, _super);
    function CarOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CarOptions;
}(Car));
// auto pilot option
var EnhanceAutoPilot = /** @class */ (function (_super) {
    __extends(EnhanceAutoPilot, _super);
    function EnhanceAutoPilot(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    EnhanceAutoPilot.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + ', Enhanced AutoPilot.';
    };
    EnhanceAutoPilot.prototype.cost = function () {
        return this.decoratedCar.cost() + 5000;
    };
    return EnhanceAutoPilot;
}(CarOptions));
// rear facing seats option
var RearFacingSeats = /** @class */ (function (_super) {
    __extends(RearFacingSeats, _super);
    function RearFacingSeats(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    RearFacingSeats.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + ', Rear Facing Seats.';
    };
    RearFacingSeats.prototype.cost = function () {
        return this.decoratedCar.cost() + 4000;
    };
    return RearFacingSeats;
}(CarOptions));
// create car then add read facing seats and autopilot
// (the decorators) to extend ModelS instance
var myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla);
myTesla = new EnhanceAutoPilot(myTesla);
console.log(myTesla.getDescription());
console.log(myTesla.cost());
