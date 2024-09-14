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
// check for lift are idle and nearest and only 2lifts allowed in one
// floor[one is for UP and other one is for DOWN]
// pick that
/**
 * Someting creative i need to comeup with 1 Floor and 1 Lift
 */
const STATUS = {
  IDLE: "IDLE",
  MOVING: "MOVING",
};
const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
};
const buildingWrapper = document.getElementById("lifts-wrapper");
const submitForm = document.getElementById("submit-form");
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
  const liftWrapper = document.createElement("div");
  liftWrapper.id = floorObj.floorName;
  liftWrapper.classList.add("flex", "gap-2", "pb-2", "-m-1");
  //If only one floor no lifts required
  floorObj.floorNumber === 1
    ? floor.appendChild(renderLifts(lifts, liftWrapper))
    : floor.appendChild(liftWrapper);
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
  building.classList.add("grid", "grid-cols-12", "gap-4", "mt-4");
  floors.forEach((floor) => {
    building.appendChild(renderLiftControl(floor, floors.length));
    building.appendChild(renderFloor(floor, lifts));
    building.appendChild(renderFloorName(floor.floorName));
  });
  buildingWrapper.appendChild(building);
  const renderedLifts = liftController.getLifts();
  //To make lifts persistent in same position
  renderedLifts.forEach((lift) => {
    const liftElement = document.getElementById(lift.liftNo);
    const liftRect = liftElement.getBoundingClientRect();
    liftElement.style.left = `${liftRect.left}px`;
  });
  renderedLifts.forEach((lift) => {
    const liftElement = document.getElementById(lift.liftNo);
    liftElement.style.position = `absolute`;
  });
}

function renderLifts(lifts, liftWrapper) {
  lifts.forEach((lift, index) => {
    const liftElement = document.createElement("div");
    liftElement.id = lift.liftNo;
    const leftDoor = document.createElement("div");
    leftDoor.classList.add("door-left");
    const rightDoor = document.createElement("div");
    rightDoor.classList.add("door-right");
    liftElement.appendChild(leftDoor);
    liftElement.appendChild(rightDoor);
    liftElement.classList.add(
      "bg-gray-500",
      "w-16",
      "h-20",
      "rounded-sm",
      "border-2",
      "border-gray-500",
      "relative",
      "lift"
    );
    liftWrapper.appendChild(liftElement);
  });
  return liftWrapper;
}

submitForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const noOfFloorsElement = document.getElementById("no-of-floors");
  const noOfLiftsElement = document.getElementById("no-of-lifts");
  const noOfFloors = noOfFloorsElement.value;
  const noOfLifts = noOfLiftsElement.value;
  liftController.renderBuilding(noOfFloors, noOfLifts);
});

function renderLiftMovement({
  fromFloor,
  toFloor,
  fromFloorName,
  toFloorName,
  direction,
  liftNo,
  openLiftDoors,
}) {
  const noOfFloors = toFloor - fromFloor;
  const timeRequiredToReach = noOfFloors * 2; // Each floor crossing time 2 secs
  console.log(
    timeRequiredToReach,
    fromFloor,
    toFloor,
    fromFloorName,
    toFloorName
  );
  const source = document.getElementById(fromFloorName);
  const destination = document.getElementById(toFloorName);
  const sourceRect = source.getBoundingClientRect();
  const destinationRect = destination.getBoundingClientRect();

  const movingLift = document.getElementById(liftNo);
  const movingLiftRect = movingLift.getBoundingClientRect();
  movingLift.style.position = "absolute";
  movingLift.style.top = `${sourceRect.top + window.scrollY}px`;
  movingLift.style.left = `${movingLiftRect.left + window.scrollX}px`;
  movingLift.classList.add("moving");
  const deltaY = destinationRect.top - sourceRect.top;
  const deltaX = destinationRect.left - sourceRect.left;
  movingLift.addEventListener("transitionend", (e) => {
    // Optionally, you can do something like swap content or hide the source
    movingLift.classList.remove("moving");
    movingLift.style = "";
    movingLift.style.position = "absolute";
    movingLift.style.left = `${movingLiftRect.left}px`;
    destination.appendChild(movingLift);
    if (e.propertyName === "transform") {
      openLiftDoors(toFloor);
    }
  });
  // Trigger the animation using CSS transform
  requestAnimationFrame(() => {
    //movingLift.style.left = leftPosition;
    movingLift.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    movingLift.style.transitionDuration = `${Math.abs(timeRequiredToReach)}s`;
  });
}

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
    this.direction = direction;
    this.status = STATUS.MOVING;
    if (fromFloor !== toFloor) {
      this.renderMove({
        fromFloor,
        toFloor,
        direction,
        liftNo: this.liftNo,
        openLiftDoors: this.open.bind(this),
      });
    } else {
      this.open(floor);
    }
  }
  open(floor) {
    console.log("Opening the door", floor);
    this.floor = floor;
    setTimeout(() => {
      document.getElementById(this.liftNo).classList.add("slide");
    }, 0);
    this.close();
  }
  close() {
    const lift = document.getElementById(this.liftNo);
    setTimeout(() => {
      lift.classList.remove("slide");
    }, 2500);
    lift.addEventListener("transitionend", (e) => {
      if (e.propertyName === "left") {
        this.status = STATUS.IDLE;
      }
    });
  }
  renderMove({ fromFloor, toFloor, direction, liftNo, openLiftDoors }) {
    const fromFloorName = `FLOOR-${fromFloor}`;
    const toFloorName = `FLOOR-${toFloor}`;
    renderLiftMovement({
      fromFloor,
      toFloor,
      fromFloorName,
      toFloorName,
      direction,
      liftNo,
      openLiftDoors,
    });
  }
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
  getLifts() {
    return this.lifts;
  }
  renderBuilding(noOfFloors, noOfLifts) {
    this.totalFloors = noOfFloors;
    this.totalLifts = noOfLifts;
    this.lifts = [];
    this.floors = [];
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
  getAvailableLift(floorNumber, direction) {
    return this.lifts.find((lift, i) => {
      if (lift.status === STATUS.IDLE && lift.direction === direction) {
        return lift;
      }
    });
  }
  liftRequest(floorNumber, direction) {
    const lift = this.getAvailableLift(floorNumber, direction);
    lift?.move(direction, floorNumber);
  }
}

const liftController = new LiftController();
//liftController.getLifts();
