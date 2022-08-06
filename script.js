

const StaffNumber = parseInt(JSON.parse(window.localStorage.getItem('staffNumber'))) || 0;
const StationList = JSON.parse(window.localStorage.getItem('stationList')) || [];



// 車站類別
class Station {
    constructor(place, price, passenger) {
        this.place = place;
        this.price = price;
        this.passenger = passenger
    }
}








