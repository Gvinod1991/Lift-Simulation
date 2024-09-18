const STATUS = {
  IDLE: "IDLE",
  MOVING: "MOVING",
};
const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
};
const errorIds = {
  noOfFloors: "no-of-floors-error",
  noOfLifts: "no-of-lifts-error",
};
const buildingWrapper = document.getElementById("lifts-wrapper");
const submitForm = document.getElementById("submit-form");
const btnClassList = [
  "text-center",
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
  "mb-1",
];
function renderLiftControl(floorObj, noOfFloors) {
  const liftControlElement = document.createElement("div");
  liftControlElement.classList.add(
    "flex",
    "justify-center",
    "flex-col",
    "ml-4",
    "mb-1",
    "mr-4"
  );
  if (Number(floorObj.floorNumber) !== Number(noOfFloors)) {
    const upBtn = document.createElement("button");
    upBtn.addEventListener("click", function () {
      liftController.liftRequest(floorObj.floorNumber, DIRECTION.UP);
    });
    upBtn.classList.add(...btnClassList);
    const imgElement = document.createElement("img");
    imgElement.classList.add("w-1/2", "rotate-180", "m-auto");
    imgElement.src = "/src/img/down-chevron.svg";
    imgElement.alt = "Up arrow";
    upBtn.appendChild(imgElement);
    liftControlElement.append(upBtn);
  }
  if (floorObj.floorNumber !== 1) {
    const downBtn = document.createElement("button");
    downBtn.addEventListener("click", function () {
      liftController.liftRequest(floorObj.floorNumber, DIRECTION.DOWN);
    });
    downBtn.classList.add(...btnClassList);
    const imgElement = document.createElement("img");
    imgElement.classList.add("w-1/2", "m-auto");
    imgElement.src = "/src/img/down-chevron.svg";
    imgElement.alt = "Down arrow";
    downBtn.appendChild(imgElement);
    liftControlElement.append(downBtn);
  }
  return liftControlElement;
}
function renderFloor(floorObj, lifts) {
  const floor = document.createElement("div");
  floor.classList.add(
    "border-b-2",
    "w-9/12",
    "md:w-11/12",
    "border-black",
    "h-24"
  );
  const liftWrapper = document.createElement("div");
  liftWrapper.id = floorObj.floorName;
  liftWrapper.classList.add("flex", "w-min", "gap-2", "pb-2");
  //If only one floor no lifts required
  floorObj.floorNumber === 1
    ? floor.appendChild(renderLifts(lifts, liftWrapper))
    : floor.appendChild(liftWrapper);
  return floor;
}
function renderFloorName(floorName) {
  const floorLabel = document.createElement("label");
  floorLabel.classList.add("mt-auto", "text-center");
  floorLabel.innerText = floorName;
  return floorLabel;
}

function renderBuildingAndLifts(floors, lifts) {
  buildingWrapper.innerHTML = null;

  floors.forEach((floor) => {
    const building = document.createElement("div");
    building.classList.add("flex", "mt-4");
    const florNameAndControl = document.createElement("div");
    florNameAndControl.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-start",
      "-mt-2",
      "w-3/12",
      "md:w-1/12"
    );
    florNameAndControl.appendChild(renderFloorName(floor.floorName));
    florNameAndControl.appendChild(renderLiftControl(floor, floors.length));
    building.appendChild(florNameAndControl);
    building.appendChild(renderFloor(floor, lifts));
    buildingWrapper.appendChild(building);
  });

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
      "h-24",
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
  Object.entries(errorIds).map(([key, value]) => {
    document.getElementById(value).innerText = "";
  });
  const noOfFloorsElement = document.getElementById("no-of-floors");
  const noOfLiftsElement = document.getElementById("no-of-lifts");
  const noOfFloors = noOfFloorsElement.value;
  const noOfLifts = noOfLiftsElement.value;
  const { isFormValid, errors } = validateForm({ noOfFloors, noOfLifts });
  if (Object.keys(errors).length > 0) {
    //render errors
    Object.entries(errors).map(([key, value]) => {
      document.getElementById(errorIds[key]).innerText = value;
    });
    return false;
  }
  if (isFormValid) {
    liftController.renderBuilding(noOfFloors, noOfLifts);
  }
});

function renderLiftMovement({
  fromFloor,
  toFloor,
  fromFloorName,
  toFloorName,
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
    movingLift.classList.remove("moving");
    movingLift.style = "";
    movingLift.style.position = "absolute";
    movingLift.style.left = `${movingLiftRect.left}px`;
    destination.appendChild(movingLift);
    if (e.propertyName === "transform") {
      openLiftDoors();
    }
  });
  // Trigger the animation using CSS transform
  requestAnimationFrame(() => {
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
    this.floor = floor;
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
      this.open();
    }
  }
  open() {
    setTimeout(() => {
      document.getElementById(this.liftNo).classList.add("slide");
    }, 0);
    this.close();
  }
  close() {
    const lift = document.getElementById(this.liftNo);
    //Close the door after 2.5 secs
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
    const movingLiftToSameFloor = this.lifts.find(
      (lift) =>
        lift.status === STATUS.MOVING &&
        lift.direction === direction &&
        lift.floor === floorNumber
    );
    if (movingLiftToSameFloor) {
      return null;
    }
    const floorDistance = [];
    this.lifts.forEach((lift) => {
      if (lift.status === STATUS.IDLE) {
        floorDistance.push({
          distance: Math.abs(floorNumber - lift.floor),
          lift,
        });
      }
    });
    const sortedLifts = floorDistance.sort(
      (lift1, lift2) => lift1.distance - lift2.distance
    );
    if (sortedLifts.length > 0) {
      return sortedLifts[0].lift;
    }
    return null;
  }
  liftRequest(floorNumber, direction) {
    const lift = this.getAvailableLift(floorNumber, direction);
    lift?.move(direction, floorNumber);
  }
}

const liftController = new LiftController();
