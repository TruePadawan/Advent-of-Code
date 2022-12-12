const input = await Deno.readTextFile("./input.txt");
/*
LOOP THROUGH AND KEEP TRACK OF 3 CHARS AFTER CURRENT INDEX AND NUBMER OF CHARS VISITED.
IF ALL 4 CHARS ARE UNIQUE, FIRST START-OF-PACKET DETECTED
*/
function allCharUnique(list) {
	const buffer = {};
	for (let i = 0; i < list.length; ++i) {
		if (buffer[list[i]] !== undefined) {
			return false;
		}
		buffer[list[i]] = true;
	}
	return true;
}

const datastream = input.split("");
let nCharactersProcessed = 0;
for (let i = 0; i + 3 <= datastream.length; ++i) {
	const possibleMarker = datastream.slice(i, i + 4);
    nCharactersProcessed = i + 4;
	if (allCharUnique(possibleMarker)) {
		break;
	}
}

console.log(nCharactersProcessed);
