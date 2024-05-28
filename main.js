let finalDepAmt = 0;
let finalWitAmt = 0;

const calculate = () => {
	const depFile = document.querySelector("#deposit_file").files[0];
	const witFile = document.querySelector("#withdrawal_file").files[0];

	if (depFile && witFile) {
		const depositReader = new FileReader();
		const withdrawalReader = new FileReader();

		depositReader.onload = function (e) {
			const depText = e.target.result;
			const depData = parseCSV(depText);
			depData.forEach((dep) => {
				if (dep[3] === "Successful") {
					finalDepAmt += parseFloat(dep[1]);
				}
			});

			document.querySelector("#results").innerHTML += `
                <span>You have deposited $${finalDepAmt.toFixed(2)}</span>
            `;
			checkAndUpdateResults();
		};

		withdrawalReader.onload = function (e) {
			const witText = e.target.result;
			const witData = parseCSV(witText);
			witData.forEach((wit) => {
				if (wit[3] === "Successful") {
					finalWitAmt += Math.abs(parseFloat(wit[1]));
				}
			});

			document.querySelector("#results").innerHTML += `
                <span>You have withdrew $${finalWitAmt.toFixed(2)}</span>
            `;
			checkAndUpdateResults();
		};

		depositReader.readAsText(depFile);
		withdrawalReader.readAsText(witFile);
	}
};

function parseCSV(text) {
	const rows = text
		.trim()
		.split("\n")
		.map((row) => row.split(","));
	return rows;
}

function checkAndUpdateResults() {
	if (finalDepAmt !== 0 && finalWitAmt !== 0) {
		document.querySelector("#results").innerHTML += `
            <h4>You have profited $${(finalWitAmt - finalDepAmt).toFixed(2)}</h4>
        `;
	}
}
