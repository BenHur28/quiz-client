export const getFormatedTime = (seconds: number) => {
	return (
		Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0") +
		":" +
		Math.floor(seconds % 60)
			.toString()
			.padStart(2, "0")
	);
};
