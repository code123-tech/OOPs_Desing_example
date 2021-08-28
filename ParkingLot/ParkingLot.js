const VECHILE_SIZE = {
  Motorcycle: 0,
  Compact: 1,
  Large:2 
}
const VechileCharges = {
  0: 10,
  1: 20,
  2: 30
};
const NO_OF_ROWS_IN_EACH_LEVEL = 10;

function generateRandom(){
  return Math.floor(Math.random()*3)+1
}

class ParkingLot{
  constructor(level){
    this.totalLevels = level;
    this.levels = [];
  }
  
  ParkVechile(vechile){
    for(var level of this.levels){
      if(level.parkInLevel(vechile)){
        return true;
      }
    }
    return false;
  }
}


class ParkingLevels{
  
  constructor(){
    this.total_spots = NO_OF_ROWS_IN_EACH_LEVEL;
    this.available_spot = 0;
    this.parking_spots = [];
  }
  
  free_spot(){
    this.available_spot -= 1;
  }
  
  parkInLevel(vechile){
    var spot = this.find_next_available_slot();
    if(spot === null) return null;
    
    if(spot.park_vechile(vechile)){
        this.available_spot += 1;
        return true;
    }
    return false;
  }
  
  find_next_available_slot(){
    return this.parking_spots[this.available_spot];
  }
};


class ParkingSpot{
  constructor(level, level_pos, spot_size){
    this.level = level
    this.level_index = level_pos;
    this.spot_size = spot_size;
    this.vechile = null;
  }
  
  isAvailable(){
    return this.vechile !== null;
  }
  
  can_fit_vechile(vechile){
     if(this.vechile !== null) return false;
     
    // return vechile.can_fit_in_spot(this);
    return true;
  }
  park_vechile(vechile){
    if(this.isAvailable()) return false;
    
    if(this.can_fit_vechile(vechile)){
      vechile.vechile_spot_level = this.level;
      vechile.vechile_spot_no = this.level_index;
      this.vechile = vechile;
      return true;
    }
    return false;
  }
}


var parkingLotObject = new ParkingLot(6);

for(var i = 0;i<6;i++){
  parkingLotObject.levels.push(new ParkingLevels());
  
  for(var j = 0;j < NO_OF_ROWS_IN_EACH_LEVEL; j++){
    
    var spotObjects = new ParkingSpot(i,j,generateRandom());
    
    parkingLotObject.levels[i].parking_spots.push(spotObjects)
  }
}






class Vechile{
  constructor(vechile_size,vechile_no, vechile_owner,vechile_owner_mobile){
    this.vechile_size = vechile_size;
    this.vechile_no = vechile_no;
    this.vechile_owner = vechile_owner;
    this.vechile_owner_mobile = vechile_owner_mobile;
    this.vechile_spot_level = null;
    this.vechile_spot_no = null;
    this.vechile_entered_time = new Date().getTime();
    this.vechile_departure_time = null;
  }
  
  calculateCharge(){
    this.vechile_departure_time = new Date().getTime();
    var diff = this.vechile_departure_time - this.vechile_entered_time;
    var charge = VechileCharges[this.vechile_size];
    return (charge*(diff/1000)).toFixed(2);
  }
}


class Motorcycle extends Vechile{
  constructor(vechile_no, vechile_owner,vechile_owner_mobile){
    // super(VECHILE_SIZE.Motorcycle,vechile_no, vechile_owner,vechile_owner_mobile,vechile_spot_level, vechile_spot_no);
  }
  
  can_fit_in_spot(spot){
    return VECHILE_SIZE.Motorcycle <= spot.spot_size;
  }
}

class Car extends Vechile{
  constructor(vechile_no, vechile_owner,vechile_owner_mobile){
    // super(VECHILE_SIZE.Compact,vechile_no, vechile_owner,vechile_owner_mobile,vechile_spot_level, vechile_spot_no);
  }
  can_fit_in_spot(spot){
    return VECHILE_SIZE.Compact <= spot.spot_size;
  }
}

class Bus extends Vechile{
  constructor(vechile_no, vechile_owner,vechile_owner_mobile){
    // super(VECHILE_SIZE.Large,vechile_no, vechile_owner,vechile_owner_mobile,vechile_spot_level, vechile_spot_no);
  }
  can_fit_in_spot(spot){
    return VECHILE_SIZE.Large <= spot.spot_size;
  }
}


//// Make Vechile 

var motor = new Vechile(VECHILE_SIZE.Motorcycle,1234, 'Ram Prasad', 8768576678);
var car = new Vechile(VECHILE_SIZE.Compact,1235, 'Shyam Prasad', 8789576678);
var bus = new Vechile(VECHILE_SIZE.Large,1236, 'Meera Prasad', 8760576678);
 
parkingLotObject.ParkVechile(motor);
parkingLotObject.ParkVechile(car);
console.log(motor)
console.log(parkingLotObject.levels[0].parking_spots[0]);

console.log(car)
console.log(parkingLotObject.levels[0].parking_spots[1])
