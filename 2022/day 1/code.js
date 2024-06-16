// Linux - mind the regex

import readInput from "../../init.js";

const input = readInput(import.meta.url);

const calories = input.split("\n");
const calorieSumList = [];
let calorieSum = 0;

for (let i = 0; i < calories.length; i++) {
	const calorie = calories[i];
	const currentElfCaloriesAreSummedUp = calorie === "";

	if (currentElfCaloriesAreSummedUp) {
		if (calorieSumList.length === 0) {
			calorieSumList.push(calorieSum);
		} else {
			// Check if the current elf's calorie sum is the highest, 2nd or 3rd and insert it the respective position, else just put it at the end of the array
			if (calorieSum > calorieSumList[0]) {
				calorieSumList.unshift(calorieSum);
			} else if (calorieSum > calorieSumList[1]) {
				calorieSumList.splice(1, 0, calorieSum);
			} else if (calorieSum > calorieSumList[2]) {
				calorieSumList.splice(2, 0, calorieSumList);
			} else {
				calorieSumList.push(calorieSum);
			}
		}
		calorieSum = 0;
	} else {
		calorieSum += +calorie;
	}
}

const highestCalorieSum = calorieSumList[0];
console.log(highestCalorieSum);

const sumOfTopThreeCalories =
	calorieSumList[0] + calorieSumList[1] + calorieSumList[2];
console.log(sumOfTopThreeCalories);
