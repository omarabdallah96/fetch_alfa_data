

function getAreaCode(number) {
	if (!/^\d+$/.test(number)) {
		throw new Error("Invalid input! Only numbers allowed");
	}
	if (number.length !== 8) {
		throw new Error(
			"Invalid number format! The number should be 8 characters long."
		);
	}
	var areaCode;
	var mainCode = number.substring(0, 2);
	var secondaryCode = number.substring(2, 3);

	switch (mainCode) {
		case "01":
			areaCode = "Beirut";
			break;
		case "02":
			areaCode = "Syria (no longer in use)";
			break;
		case "03":
			switch (secondaryCode) {
				case "0":
				case "6":
				case "7":
				case "8":
				case "9":
					areaCode = "Touch";
					break;
				default:
					areaCode = "Alfa";
			}
			break;
		case "04":
			areaCode = "Mount Lebanon, Metn Caza";
			break;
		case "05":
			areaCode = "Mount Lebanon, Baabda Caza + Aley Caza + Chouf Caza";
			break;
		case "06":
			areaCode = "North Lebanon";
			break;
		case "07":
			areaCode = "South Lebanon";
			break;
		case "08":
			areaCode = "Bekaa and Baalbek-Hermel";
			break;
		case "09":
			areaCode = "Mount Lebanon, Kesrouan Caza + Byblos Caza";
			break;
		case "10":
			areaCode = "MMS";
			break;
		case "70":
			switch (secondaryCode) {
				case "0":
				case "6":
				case "7":
				case "8":
				case "9":
					areaCode = "Touch";
					break;
				default:
					areaCode = "Alfa";
			}
			break;
		case "71":
			switch (secondaryCode) {
				case "0":
				case "6":
				case "7":
				case "8":
				case "9":
					areaCode = "Alfa";
					break;
				default:
					areaCode = "Touch";
			}
			break;
		case "76":
			switch (secondaryCode) {
				case "0":
				case "6":
				case "7":
				case "8":
				case "9":
					areaCode = "Touch";
					break;
				case "2":
					areaCode = "n/a";
					break;
				default:
					areaCode = "Alfa";
			}
			break;
		case "78":
			switch (secondaryCode) {
				case "8":
				case "9":
					areaCode = "Touch";
					break;
				default:
					areaCode = "n/a";
			}
			break;
		case "79":
			switch (secondaryCode) {
				case "1":
				case "2":
				case "3":
					areaCode = "Alfa";
					break;
				default:
					areaCode = "n/a";
			}
			break;
		case "81":
			switch (secondaryCode) {
				case "2":
				case "3":
				case "4":
					areaCode = "Alfa";
					break;
				case "6":
				case "7":
				case "8":
					areaCode = "Touch";
					break;
				default:
					areaCode = "n/a";
			}
			break;
		default:
			throw new Error("Invalid number!");
	}
	return areaCode;
}
function isAlfa(number) {
	return getAreaCode(number) === "Alfa";
}
module.exports = { isAlfa, getAreaCode };