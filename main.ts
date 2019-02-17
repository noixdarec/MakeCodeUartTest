/**
 * This extension read distance and temperature from ultrasonic sensor
 * US-100 in serial mode
 * by Narongporn Laosrisin
 */


//% weight=100 color=#9C0A0A icon="\uf545"
namespace US100 {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% blockid="us100_init" block="set US-100 RX %us100RX| TX %us100TX"
    export function us100init(us100RX: SerialPin, us100TX: SerialPin): void {
        serial.redirect(us100RX, us100TX, BaudRate.BaudRate9600)
    }

    /**
    * return the distance in millimeters
    */
    //% blockid="us100_distance" block="distance (mm)"
    export function readdistance(): number {
        let data: Buffer = null
        serial.writeString("U")
        data = serial.readBuffer(2)
        return data.getNumber(NumberFormat.UInt8LE, 0) * 256 + data.getNumber(NumberFormat.UInt8LE, 1);
    }
    /**
    * return the temperature in celcius
    */
    //% blockid="us100_temperature" block="temperature (c)"
    export function readtemperature(): number {
        let data: Buffer = null
        serial.writeString("P")
        data = serial.readBuffer(1)
        return data.getNumber(NumberFormat.UInt8LE, 0) - 45;
    }
}
