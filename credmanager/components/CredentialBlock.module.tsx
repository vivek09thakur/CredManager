import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: width < 400 ? 6 : 10,
		gap: width < 400 ? 6 : 10,
		fontFamily: "Poppins_400Regular",
		width: "100%",
	},
	block: {
		backgroundColor: "#c8aef1ff",
		borderRadius: 5,
		padding: width < 400 ? 10 : 14,
		minWidth: width < 400 ? 110 : 140,
		maxWidth: width < 400 ? 150 : 200,
		flexGrow: 1,
		flexBasis: width < 500 ? "48%" : "23%",
		margin: width < 400 ? 3 : 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 1.5,
	},
	label: {
		fontWeight: "bold",
		color: "#817f7fff",
		marginBottom: 1,
		fontSize: width < 400 ? 10 : 12,
		letterSpacing: 0.2,
	},
	text: {
		marginBottom: 6,
		color: "#202124",
		fontSize: width < 400 ? 12 : 14,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
		flexWrap: "wrap",
	},
	copyBtn: {
		marginLeft: 6,
		paddingVertical: width < 400 ? 1 : 2,
		paddingHorizontal: width < 400 ? 5 : 7,
		backgroundColor: "#e0e0e0",
		borderRadius: 6,
		borderWidth: 0,
	},
	copyBtnText: {
		fontSize: width < 400 ? 9 : 11,
		color: "#333",
	},
	toggleBtn: {
		marginLeft: 6,
		paddingVertical: width < 400 ? 1 : 2,
		paddingHorizontal: width < 400 ? 5 : 7,
		backgroundColor: "#ffe082",
		borderRadius: 6,
		borderWidth: 0,
	},
	toggleBtnText: {
		fontSize: width < 400 ? 9 : 11,
		color: "#795548",
	},
});

export default styles;
