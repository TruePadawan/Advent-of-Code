import readInput from "../../init.js";

const SHAPE_SCORE = {
	ROCK: 1,
	PAPER: 2,
	SCISSORS: 3,
};
const OUTCOME_SCORE = {
	WIN: 6,
	LOSS: 0,
	DRAW: 3,
};
const SHAPES = {
	A: "ROCK",
	X: "ROCK",
	B: "PAPER",
	Y: "PAPER",
	C: "SCISSORS",
	Z: "SCISSORS",
};
const SHAPES_ENEMY = {
	ROCK: "PAPER",
	PAPER: "SCISSORS",
	SCISSORS: "ROCK",
};
const SHAPES_WIN_AGAINST = {
	ROCK: "SCISSORS",
	PAPER: "ROCK",
	SCISSORS: "PAPER",
};

const input = readInput(import.meta.url);
const choices = input.split("\r\n");
let totalScore = 0;

// PART 1
choices.forEach((choice) => {
	let scoreForRound = 0;
	const [opponentChoice, myChoice] = choice.split(" ");
	const opponentShape = SHAPES[opponentChoice];
	const myShape = SHAPES[myChoice];

	if (myShape === opponentShape) {
		scoreForRound = OUTCOME_SCORE.DRAW + SHAPE_SCORE[myShape];
	} else {
		if (SHAPES_ENEMY[myShape] === opponentShape) {
			scoreForRound = OUTCOME_SCORE.LOSS + SHAPE_SCORE[myShape];
		} else {
			scoreForRound = OUTCOME_SCORE.WIN + SHAPE_SCORE[myShape];
		}
	}
	totalScore += scoreForRound;
});

console.log(`Total score is ${totalScore}`);

//PART 2
let totalScore_2 = 0;
choices.forEach((choice) => {
	let scoreForRound = 0;
	const [opponentChoice, roundOutcome] = choice.split(" ");
	const opponentShape = SHAPES[opponentChoice];
	switch (roundOutcome) {
		case "X":
			scoreForRound +=
				OUTCOME_SCORE.LOSS + SHAPE_SCORE[SHAPES_WIN_AGAINST[opponentShape]];
			break;
		case "Y":
			scoreForRound += OUTCOME_SCORE.DRAW + SHAPE_SCORE[opponentShape];
			break;
		case "Z":
			scoreForRound +=
				OUTCOME_SCORE.WIN + SHAPE_SCORE[SHAPES_ENEMY[opponentShape]];
			break;
		default:
			break;
	}
	totalScore_2 += scoreForRound;
});

console.log(`Part 2 total score is ${totalScore_2}`);
