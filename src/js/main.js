/*
LiftNo-1
from 1 to 3
3-1 = 2 * 2 = 4 seconds

*/

/**
 * LiftNO-1
 * is at FloorNo3
 */

/**
 * In case of multiple lifts , which lift should be chosen
 * What is the lift choosing criteria
 *
 */

/**
 * LIFT1 is at FLOOR2
 *
 * LIFT2 is at FLOOR4
 *
 * LIFT3 is at FLOOR3
 */

/**
 * When lift is running then idle lifts should be chosen
 * When no lifts are running first lift to be chosen
 * When
 */
/**
 * The Main Components
Our elevator system will consist of the following components:

Elevator: The core class representing the elevator.
Request: A class to encapsulate an elevator request.
Controller: Manages the elevators and assigns requests to them.

Elevator Class
The Elevator class represents a single elevator. Its key responsibilities include:
Moving up and down.
Opening and closing doors.
Keeping track of its current floor.

Request Class
Each elevator request is an instance of the Request class, which includes:

Requested floor.
Direction (up or down).

Controller Class
The Controller class is the brain of the system, responsible for:

Handling requests.
Assigning requests to the appropriate elevator.

Queue concept to be implemented

*/
//INIT
// l1,l2,l3
// f1,f2,f3,f4,f5
// l1->f1,
// l2->f5
// l3->f2;

//ctl -> up f4
// check for lift are idle and nearest
// pick that
const buildingWrapper = document.getElementById("lifts-wrapper");
const submitBtn = document.getElementById("submit-btn");
const btnClassList = [
  "text-white",
  "bg-gradient-to-br",
  "from-purple-600",
  "to-blue-500",
  "hover:bg-gradient-to-bl",
  "focus:ring-4",
  "focus:outline-none",
  "focus:ring-blue-300",
  "dark:focus:ring-blue-800",
  "font-medium",
  "rounded-lg",
  "text-sm",
  "px-5",
  "py-2.5",
  "text-center",
  "mb-1",
];
function renderLiftControl(floorObj, noOfFloors) {
  const liftControlElement = document.createElement("div");
  liftControlElement.classList.add(
    "col-span-1",
    "flex",
    "justify-center",
    "flex-col",
    "ml-1",
    "mb-1"
  );
  if (floorObj.floorNumber !== noOfFloors) {
    const upBtn = document.createElement("button");
    upBtn.addEventListener("click", function () {
      liftController.liftRequest(floorObj.floorNumber, DIRECTION.UP);
    });
    upBtn.classList.add(...btnClassList);
    upBtn.innerText = "UP";
    liftControlElement.append(upBtn);
  }
  if (floorObj.floorNumber !== 1) {
    const downBtn = document.createElement("button");
    downBtn.addEventListener("click", function () {
      liftController.liftRequest(floorObj.floorNumber, DIRECTION.DOWN);
    });
    downBtn.classList.add(...btnClassList);
    downBtn.innerText = "DOWN";
    liftControlElement.append(downBtn);
  }
  return liftControlElement;
}
function renderFloor(floorObj, lifts) {
  const floor = document.createElement("div");
  floor.classList.add(
    "border-b-2",
    "border-black",
    "w-full",
    "h-20",
    "col-span-10"
  );
  if (floorObj.floorNumber === 1) floor.appendChild(renderLifts(lifts));
  return floor;
}
function renderFloorName(floorName) {
  const floorLabel = document.createElement("label");
  floorLabel.classList.add("col-span-1", "mt-auto");
  floorLabel.innerText = floorName;
  return floorLabel;
}

function renderBuildingAndLifts(floors, lifts) {
  buildingWrapper.innerHTML = null;
  const building = document.createElement("div");
  building.classList.add("grid", "grid-cols-12", "gap-4");
  floors.forEach((floor, i) => {
    building.appendChild(renderLiftControl(floor, floors.length));
    building.appendChild(renderFloor(floor, lifts));
    building.appendChild(renderFloorName(floor.floorName));
  });
  buildingWrapper.append(building);
}

function renderLifts(lifts) {
  const liftWrapper = document.createElement("div");
  liftWrapper.classList.add("flex", "flex-row", "gap-2", "pb-2", "-m-1");
  lifts.forEach((lift) => {
    console.log(lift);
    const liftElement = document.createElement("div");
    liftElement.classList.add("bg-blue-500", "w-16", "h-20", "rounded-md");
    liftWrapper.appendChild(liftElement);
  });
  return liftWrapper;
}

submitBtn.addEventListener("click", function () {
  const noOfFloors = 10;
  const noOfLifts = 15;
  liftController.renderBuilding(noOfFloors, noOfLifts);
});

function renderLiftMovement(fromFloor, toFloor, direction, liftNo) {}

const STATUS = {
  IDLE: "IDLE",
  MOVING: "MOVING",
};
const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
};
class Lift {
  constructor(floor, liftNo) {
    this.floor = floor;
    this.status = STATUS.IDLE;
    this.liftNo = liftNo;
    this.direction = DIRECTION.UP;
  }
  move(direction, floor) {
    const fromFloor = this.floor;
    const toFloor = floor;
    this.status = STATUS.MOVING;
    this.direction = direction;
    this.renderMove(fromFloor, toFloor, direction, this.liftNo);
    this.floor = floor;
    this.open();
    this.close();
    this.status = STATUS.IDLE;
  }
  open() {
    console.log("Opening the door");
  }
  close() {
    console.log("Closing the door");
  }
  renderMove(fromFloor, toFloor, direction, liftNo) {}
  getLiftPosition() {
    return this.floor;
  }
}

class Floor {
  constructor(floorNumber) {
    this.floorNumber = floorNumber;
    this.floorName = `FLOOR-${floorNumber}`;
  }
}

class LiftController {
  constructor() {
    this.totalFloors = 0;
    this.totalLifts = 0;
    this.lifts = [];
    this.floors = [];
  }
  renderBuilding(noOfFloors, noOfLifts) {
    this.totalFloors = noOfFloors;
    this.totalLifts = noOfLifts;
    for (let i = 0; i < this.totalLifts; i++) {
      let lift = new Lift(1, `lift-${i + 1}`);
      this.lifts.push(lift);
    }
    for (let j = this.totalFloors; j > 0; j--) {
      let floor = new Floor(j);
      this.floors.push(floor);
    }
    renderBuildingAndLifts(this.floors, this.lifts);
  }
  liftRequest(floorNumber, direction) {
    this.lifts.map((lift) => {
      lift.move(direction, floorNumber);
    });
  }
}

const liftController = new LiftController();
