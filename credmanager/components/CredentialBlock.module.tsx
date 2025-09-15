import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: width < 500 ? "column" : "row",
		flexWrap: "wrap",
		justifyContent: "center",
		padding: width < 400 ? 8 : 12,
		gap: width < 400 ? 8 : 12,
		fontFamily: "Poppins_400Regular",
		width: "100%",
	},
	block: {
		backgroundColor: "#c8aef1ff",
		borderRadius: 5,
		padding: width < 400 ? 12 : 18,
		minWidth: width < 400 ? 120 : 160,
		maxWidth: width < 400 ? 180 : 220,
		width: width < 500 ? "100%" : undefined,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		
		marginBottom: width < 500 ? 10 : 0,
	},
	label: {
		fontWeight: "bold",
		color: "#817f7fff",
		marginBottom: 2,
		fontSize: width < 400 ? 11 : 13,
		letterSpacing: 0.2,
	},
	text: {
		marginBottom: 8,
		color: "#202124",
		fontSize: width < 400 ? 13 : 15,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		flexWrap: "wrap",
	},
	copyBtn: {
		marginLeft: 8,
		paddingVertical: width < 400 ? 1 : 2,
		paddingHorizontal: width < 400 ? 6 : 8,
		backgroundColor: "#e0e0e0",
		borderRadius: 6,
		borderWidth: 0,
	},
	copyBtnText: {
		fontSize: width < 400 ? 10 : 12,
		color: "#333",
	},
	toggleBtn: {
		marginLeft: 8,
		paddingVertical: width < 400 ? 1 : 2,
		paddingHorizontal: width < 400 ? 6 : 8,
		backgroundColor: "#ffe082",
		borderRadius: 6,
		borderWidth: 0,
	},
	toggleBtnText: {
		fontSize: width < 400 ? 10 : 12,
		color: "#795548",
	},
});

export default styles;
