import readInput from "../../init.js";

const input = readInput(import.meta.url);

const stacks = [
	["W", "T", "H", "P", "J", "C", "F"],
	["H", "B", "J", "Z", "F", "V", "R", "G"],
	["R", "T", "P", "H"],
	["T", "H", "P", "N", "S", "Z"],
	["D", "C", "J", "H", "Z", "F", "V", "N"],
	["Z", "D", "W", "F", "G", "M", "P"],
	["P", "D", "J", "S", "W", "Z", "V", "M"],
	["S", "D", "N"],
	["M", "F", "S", "Z", "D"],
];

input
	.split("\r\n")
	.map((line) => line.split(" "))
	.forEach((arr) => {
		const nCratesToBeMoved = +arr.at(1);
		const movedFromIndex = +arr.at(3) - 1;
		const movedToIndex = +arr.at(-1) - 1;

		const crateGroup = [];
		for (let i = 0; i < nCratesToBeMoved; ++i) {
			const crate = stacks[movedFromIndex].shift();
			crateGroup.push(crate);
		}
		stacks[movedToIndex].unshift(...crateGroup);
	});

const topStacks = stacks.map((stack) => stack.at(0));
const topStacksString = topStacks.join("");
console.log(topStacksString);
