interface State{
    order:Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}

class Order {
    public currentState:State;

    public cancelledOrderState: State;
    public paymentPendingState: State;
    public orderBeingPreparedState: State;
    public orderShippedState: State;

    constructor(){
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);
        this.orderShippedState = new OrderShippedState(this);

        // defalut state
        this.setState(this.paymentPendingState);
    }

    public setState(state:State){
        this.currentState = state;
    }

    public getState(){
        return this.currentState;
    }
}

class PaymentPendingState implements State{
    order: Order;
    
    constructor(order:Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('cancel unpaid order');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
       console.log('payment verified');
       this.order.setState(this.order.orderBeingPreparedState);
    }
    shipOrder() {
        console.log('order cant ship yet while being processed!')
    }
}

class CancelledOrderState implements State{
    order: Order;
    
    constructor(order:Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('order already been cancelled')
    }
    verifyPayment() {
        console.log('order cancelled cant verify')
    }
    shipOrder() {
        console.log('do not ship it was cancelled')
    }
}

class OrderBeingPreparedState implements State{
    order: Order;
    
    constructor(order:Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('cancelling order');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('already verified payment');
    }
    shipOrder() {
        console.log('shipping order now');
        this.order.setState(this.order.orderShippedState);
    }
}

class OrderShippedState implements State{
    order: Order;
    
    constructor(order:Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('cant cancel already shipping');
    }
    verifyPayment() {
        console.log('already verified');
    }
    shipOrder() {
        console.log('already shipped');
    }
}

let order = new Order();
console.log('Order state: ' + (<any> order.getState()).constructor.name);
order.getState().shipOrder();
order.getState().verifyPayment();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();
