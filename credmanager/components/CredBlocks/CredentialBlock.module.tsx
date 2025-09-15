import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Responsive values based on width
const isSmall = width < 400;
const isMedium = width >= 400 && width < 800;
const isLarge = width >= 800;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "flex-start",
		padding: isSmall ? 4 : isMedium ? 8 : 16,
		gap: isSmall ? 4 : isMedium ? 8 : 12,
		fontFamily: "Poppins_400Regular",
		width: "100%",
		height: "100%",
	},
	block: {
		backgroundColor: "#c8aef1ff",
		borderRadius: 5,
		padding: isSmall ? 8 : isMedium ? 12 : 18,
		minWidth: isSmall ? 90 : isMedium ? 130 : 180,
		maxWidth: isSmall ? 120 : isMedium ? 180 : 260,
		flexGrow: 1,
		flexBasis: isSmall ? "98%" : isMedium ? "45%" : "22%",
		margin: isSmall ? 2 : isMedium ? 4 : 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 1.5,
	},
	label: {
		fontWeight: "bold",
		color: "#817f7fff",
		marginBottom: 1,
		fontSize: isSmall ? 9 : isMedium ? 11 : 13,
		letterSpacing: 0.2,
	},
	text: {
		marginBottom: 6,
		color: "#202124",
		fontSize: isSmall ? 11 : isMedium ? 13 : 15,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
		flexWrap: "wrap",
	},
	copyBtn: {
		marginLeft: 4,
		paddingVertical: isSmall ? 1 : 2,
		paddingHorizontal: isSmall ? 4 : 6,
		backgroundColor: "#e0e0e0",
		borderRadius: 6,
		borderWidth: 0,
	},
	copyBtnText: {
		fontSize: isSmall ? 8 : isMedium ? 10 : 12,
		color: "#333",
	},
	toggleBtn: {
		marginLeft: 4,
		paddingVertical: isSmall ? 1 : 2,
		paddingHorizontal: isSmall ? 4 : 6,
		backgroundColor: "#ffe082",
		borderRadius: 6,
		borderWidth: 0,
	},
	toggleBtnText: {
		fontSize: isSmall ? 8 : isMedium ? 10 : 12,
		color: "#795548",
	},
});

export default styles;
