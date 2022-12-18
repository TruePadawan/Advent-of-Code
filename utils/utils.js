export const createUID = (idLength) => {
	if (3 < idLength <= 22) {
		let mod = 1;
		Math.round(idLength) % 2 == 0 ? (mod = 2) : (mod = 1);
		idLength = Math.round(Math.round(idLength) / 2) + mod;
	} else if (3 > idLength) {
		idLength = 3;
	} else if (idLength > 13) {
		idLength = 13;
	}
	return (
		"" +
		(Math.random().toString(36).substring(2, idLength) +
			Math.random().toString(36).substring(2, idLength))
	);
};
