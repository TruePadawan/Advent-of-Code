import readInput from "../../init.js";

const input = readInput(import.meta.url);
const treeRows = input
	.split("\r\n")
	.map((treeRow) => treeRow.split("").map((treeHeight) => +treeHeight));
const ROW_LENGTH = treeRows.at(0).length;
const COLUMN_HEIGHT = treeRows.length;
let visibleTrees = ROW_LENGTH * 2 + (COLUMN_HEIGHT - 2) * 2; // INITIAL VALUE IS NUMBER OF TREES AT EDGE
let highestScenicScore = 0;

function treeIsVisible(xCord, yCord) {
	const treeHeight = treeRows.at(yCord).at(xCord);
	// CHECK LEFT
	for (let x = xCord - 1; x >= 0; --x) {
		const treeHeightAtIndex = treeRows.at(yCord).at(x);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
		if (x === 0 && treeHeightAtIndex < treeHeight) return true;
	}

	// CHECK RIGHT
	for (let x = xCord + 1; x < ROW_LENGTH; ++x) {
		const treeHeightAtIndex = treeRows.at(yCord).at(x);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
		if (x === ROW_LENGTH - 1 && treeHeightAtIndex < treeHeight) return true;
	}

	// CHECK TOP
	for (let y = yCord - 1; y >= 0; --y) {
		const treeHeightAtIndex = treeRows.at(y).at(xCord);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
		if (y === 0 && treeHeightAtIndex < treeHeight) return true;
	}

	// CHECK BOTTOM
	for (let y = yCord + 1; y < COLUMN_HEIGHT; ++y) {
		const treeHeightAtIndex = treeRows.at(y).at(xCord);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
		if (y === COLUMN_HEIGHT - 1 && treeHeightAtIndex < treeHeight) return true;
	}
	return false;
}

function getScenicScore(xCord, yCord) {
	const treeHeight = treeRows.at(yCord).at(xCord);

	// GET SCENIC SCORE - LEFT
	let scoreLeft = 0;
	for (let x = xCord - 1; x >= 0; --x) {
		++scoreLeft;
		const treeHeightAtIndex = treeRows.at(yCord).at(x);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
	}

	// GET SCENIC SCORE - RIGHT
	let scoreRight = 0;
	for (let x = xCord + 1; x < ROW_LENGTH; ++x) {
		++scoreRight;
		const treeHeightAtIndex = treeRows.at(yCord).at(x);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
	}

	// GET SCENIC SCORE - TOP
	let scoreTop = 0;
	for (let y = yCord - 1; y >= 0; --y) {
		++scoreTop;
		const treeHeightAtIndex = treeRows.at(y).at(xCord);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
	}

	// GET SCENIC SCORE - BOTTOM
	let scoreBottom = 0;
	for (let y = yCord + 1; y < COLUMN_HEIGHT; ++y) {
		++scoreBottom;
		const treeHeightAtIndex = treeRows.at(y).at(xCord);
		if (treeHeightAtIndex >= treeHeight) {
			break;
		}
	}

	return scoreLeft * scoreRight * scoreBottom * scoreTop;
}

for (let y = 1; y < COLUMN_HEIGHT - 1; ++y) {
	for (let x = 1; x < ROW_LENGTH - 1; ++x) {
		if (treeIsVisible(x, y)) {
			visibleTrees += 1;
		}
		const treeScenicScore = getScenicScore(x, y);

		if (treeScenicScore > highestScenicScore) {
			highestScenicScore = treeScenicScore;
		}
	}
}

console.log(`Part 1: ${visibleTrees}`);

console.log(`Part 2: ${highestScenicScore}`);
