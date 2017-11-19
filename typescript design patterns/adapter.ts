interface IPhone{
    useLightning();
}

interface Android{
    useMicroUSB();
}

class iPhone7 implements IPhone{
    useLightning(){
        console.log('using lightning port...')
    }
}

class GooglePixel implements Android{
    useMicroUSB(){
        console.log('using micro usb port...')
    }
}

class LightningToMicroUSBAdapter implements Android{
    iphoneDevice:IPhone;

    constructor(iphone:IPhone){
        this.iphoneDevice = iphone;
    }

    useMicroUSB() {
        console.log('use micro usb from lightning...');
        this.iphoneDevice.useLightning();
    }
}

let iphone = new iPhone7();
let chargeAdapter = new LightningToMicroUSBAdapter(iphone);
chargeAdapter.useMicroUSB();