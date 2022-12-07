const input = await Deno.readTextFile("./input.txt");
const rucksacks = input.split("\r\n");

/* CALC ITEM PRIORITY
        IF CHARACTER IS a ~ z, the priority is the difference between its char code and 96
        else if Z ~ Z,  the priority is the difference between its char code and 38
*/
function calcItemPriority(item) {
	const charCode = item.charCodeAt(0);
	if (item >= "a" && item <= "z") {
		return charCode - 96;
	}
	return charCode - 38;
}

////////////////// PART 1 //////////////////

/* For each rucksack, find the duplicate item and calc it's priority */
// let prioritySum = 0;
// rucksacks.forEach((rucksack) => {
// 	const firstCompartmentItems = {};
// 	const firstCompartment = rucksack.slice(0, rucksack.length / 2);
// 	const secondCompartment = rucksack.slice(rucksack.length / 2);
// 	let duplicateChar = "";
// 	// FIND duplicateChar ITEM
// 	for (let index = 0; index < firstCompartment.length; ++index) {
// 		const itemType = firstCompartment[index];
// 		firstCompartmentItems[itemType] = true;
// 	}
// 	for (let index = 0; index < secondCompartment.length; ++index) {
// 		const itemType = secondCompartment[index];
// 		if (firstCompartmentItems[itemType] === true) {
// 			duplicateChar = itemType;
// 			break;
// 		}
// 	}
// 	const itemPriority = calcItemPriority(duplicateChar);
// 	prioritySum += itemPriority;
// });

// console.log(prioritySum);

////////////////// PART 2 //////////////////
const elfGroupList = [];
let elfGroup = [];
let badgePrioritySum = 0;
// CREATE AM ARRAY OF ELF GROUPS
/*
[["asdadsadas", "adsadsadas", "adsadsadsa"],....]
*/
for (let index = 0; index <= rucksacks.length; index++) {
	if (index !== 0 && index % 3 === 0) {
		elfGroupList.push(elfGroup);
		if (index !== rucksacks.length) {
			elfGroup = [rucksacks[index]];
		}
	} else {
		elfGroup.push(rucksacks[index]);
	}
}

// FIND COMMON ITEM PER GROUP
elfGroupList.forEach((group) => {
	const groupItems = {};
	let groupBadge = "";

	for (let index = 0; index < group.length; ++index) {
		const elf = group[index];
		const atLastElf = index === group.length - 1;

		for (let i = 0; i < elf.length; ++i) {
			const item = elf[i];
			if (atLastElf && groupItems[item] === 1) {
				// FOUND COMMON ITEM
				groupBadge = item;
				console.log(groupBadge);
				break;
			} else {
				/* CREATE A MAP OF ITEMS FROM THE FIRST ELF IN THE GROUP
					FOR SUBSEQUENT NTH ELFS:
						IF THE NUMBER ASSOCIATED WITH AN ITEM ISN'T (N-1)
							THEN THAT MEANS THE ELF BEFORE IT DOESN'T HAVE THAT ITEM WHICH MEANS IT CAN'T BE THE GROUP'S BADGE*/
				
				if (groupItems[item] === undefined && index === 0) {
					groupItems[item] = 0;
				} else if (groupItems[item] === index - 1) {
					groupItems[item] = index;
				}
			}
		}
	}
	const badgePriority = calcItemPriority(groupBadge);
	badgePrioritySum += badgePriority;
});

console.log(badgePrioritySum);
