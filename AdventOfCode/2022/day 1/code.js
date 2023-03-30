import readInput from "../../init.js";

/*
    GROUP EACH ELF CALORIE LIST INTO AN ARRAY, ALL INTO AN ARRAY OF ELF CALORIE LIST
*/
const input = readInput(import.meta.url);

const inputToArray = input.split("\r\n");
const elvesCalories = [];
let elfCalorieList = [];
let elfTotalCalrie = 0;

// CREATE AN ARRAY REPRESENTING EACH ELF'S CALORIE LIST
for (let i = 0; i < inputToArray.length; ++i) {
	const calorie = inputToArray[i];
	if (calorie !== "") {
		elfCalorieList.push(calorie);
		elfTotalCalrie += +calorie;
	}
	if (calorie === "" || (calorie !== "" && i === inputToArray.length - 1)) {
		elfCalorieList.push(elfTotalCalrie);
		elvesCalories.push(elfCalorieList);
		elfCalorieList = [];
		elfTotalCalrie = 0;
	}
}


elvesCalories.sort((elfACalorieList, elfBCalorieList) => {
    const elfATotalCalories = elfACalorieList[elfACalorieList.length - 1];
	const elfBTotalCalories = elfBCalorieList[elfBCalorieList.length - 1];
	return elfATotalCalories - elfBTotalCalories;
}).reverse();

const highestCalorieCount = elvesCalories.at(0).at(-1);
console.log(`The highest calorie count is ${highestCalorieCount}`);

let topThreeHighestCalorieCountSum = 0;
for (let i = 0; i < elvesCalories.length; i++) {
    if (i === 3) break;
    topThreeHighestCalorieCountSum += elvesCalories.at(i).at(-1);
}

console.log(`Sum of top three calorie count is ${topThreeHighestCalorieCountSum}`);