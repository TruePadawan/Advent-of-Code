const input = Deno.readTextFileSync("./input.txt");
const treeRows = input
	.split("\r\n")
	.map((treeRow) => treeRow.split("").map((treeHeight) => +treeHeight));
const ROW_LENGTH = treeRows.at(0).length;
const COLUMN_HEIGHT = treeRows.length;
let visibleTrees = ROW_LENGTH * 2 + (COLUMN_HEIGHT - 2) * 2; // INITIAL VALUE IS NUMBER OF TREES AT EDGE

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

for (let y = 1; y < COLUMN_HEIGHT - 1; ++y) {
	for (let x = 1; x < ROW_LENGTH - 1; ++x) {
		if (treeIsVisible(x, y)) {
			visibleTrees += 1;
		}
	}
}

console.log(`Part 1: ${visibleTrees}`);
