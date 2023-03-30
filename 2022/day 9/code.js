import readInput from "../../init.js";
/* MAIN LOGIC
REPRESENT THE POSITIONS ON A 2D ARRAY
KEEP TRACK OF THE POSITIONS TAIL MOVED TO WITH AN OBJECT
LOOP THROUGH EACH STEP
    MOVE HEAD
        IF TAIL IS NOT ADJACENT
            IF NOT IN SAME ROW OR COLUMN
                MOVE DIAGONALLY ONCE TOWARDS HEAD
            ELSE
                MOVE TAIL ONCE IN X OR Y DIRECTION
            NOTE THE POSITION TAIL MOVED TO
        ELSE
            DO NOTHING
RETURN HOW MANY POSITIONS HAVE BEEN NOTED
*/

// import readInput from "../../index.js";
/* VERIFY IF TAIL IS ADJACENT TO HEAD
TAIL IS NOT ADJACENT IF EITHER ITS X OR Y POS DIFFERS FROM HEAD'S BY > |1|
*/

/* MOVE DIAGONALLY BASED ON HEAD'S POSITION
UPPER-LEFT: XDIFF IS NEGATIVE, YDIFF IS POSITIVE
UPPER-RIGHT: XDIFF IS POSITIVE, YDIFF IS POSITIVE
LOWER-LEFT: XDIFF IS NEGATIVE, YDIFF IS NEGATIVE
LOWER-RIGHT: XDIFF IS POSITIVE, YDIFF IS NEGATIVE
*/
class Position {
	x;
	y;
	constructor(xPos = 0, yPos = 0) {
		this.x = xPos;
		this.y = yPos;
	}
	toString() {
		return `${this.x},${this.y}`;
	}
	isAdjacent(pos) {
		const xDiff = Math.abs(Math.abs(this.x) - Math.abs(pos.x));
		const yDiff = Math.abs(Math.abs(this.y) - Math.abs(pos.y));
		if (xDiff > 1 || yDiff > 1) return false;
		return true;
	}
	isDiagonalTo(pos) {
		return this.x !== pos.x && this.y !== pos.y;
	}
}

function getStepData(step) {
	const raw = step.split(" ");
	return {
		direction: raw[0],
		moves: +raw[1],
	};
}

function simulateRopePhysics(steps) {
	const head = new Position();
	const tail = new Position();
	const tailPositions = {};

	for (let index = 0; index < steps.length; index++) {
		let { direction, moves } = getStepData(steps[index]);
		while (moves > 0) {
			switch (direction) {
				case "U":
					head.y += 1;
					break;
				case "D":
					head.y -= 1;
					break;
				case "L":
					head.x -= 1;
					break;
				case "R":
					head.x += 1;
					break;
				default:
					break;
			}
			if (head.isAdjacent(tail) === false) {
				if (head.x > tail.x) {
					tail.x += 1;
				} else if (head.x < tail.x) {
					tail.x -= 1;
				}

				if (head.y > tail.y) {
					tail.y += 1;
				} else if (head.y < tail.y) {
					tail.y -= 1;
				}
			}
			tailPositions[tail.toString()] = 0;
			moves -= 1;
		}
	}
	return Object.keys(tailPositions).length;
}
const input = readInput(import.meta.url);
const stepsList = input.split("\r\n");
console.log(simulateRopePhysics(stepsList));
