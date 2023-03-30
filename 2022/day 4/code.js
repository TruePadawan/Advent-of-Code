import readInput from "../../init.js";

const input = readInput(import.meta.url);
let numberOfSubsets = 0;
let numberOfOverlappingSets = 0;
const pairsListRaw = input.split("\r\n");

function isSubset(set, subset) {
	if (set.length < subset.length) return false;
	return subset.every((section) => set.includes(section));
}

function isOverlapping(setA, setB) {
	return setB.some((section) => setA.includes(section));
}

function rangeToArray(range) {
	const array = [];
	const boundary = range.split("-");
	let start = +boundary.at(0);
	const end = +boundary.at(1);
	for (; start <= end; ++start) {
		array.push(start);
	}
	return array;
}

pairsListRaw.forEach((pair) => {
	const [rangeA, rangeB] = pair.split(",");
	const setA = rangeToArray(rangeA);
	const setB = rangeToArray(rangeB);
	if (isSubset(setA, setB) || isSubset(setB, setA)) {
		numberOfSubsets += 1;
	}
	if (isOverlapping(setA, setB)) {
		numberOfOverlappingSets += 1;
	}
});

console.log(numberOfSubsets);
console.log(numberOfOverlappingSets);
