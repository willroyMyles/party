import React from "react"
import {View, Text, Colors} from "react-native-ui-lib"
import {StackHeaderProps, useHeaderHeight} from "@react-navigation/stack"
import {StyleProp, ViewStyle, StyleSheet} from "react-native"
import {BlurView} from "expo-blur"
import {headerHeight} from "../home/HomePageV3"
import {LinearGradient} from "expo-linear-gradient"
const Header = (props: {style: StyleProp<ViewStyle>}) => {
	console.log(props.style)
	return (
		<View
			marginB-30
			paddingH-15
			row
			style={[
				{
					justifyContent: "space-between",
					position: "relative",
					height: headerHeight,
					overflow: "hidden",
					backgroundColor: "transparent",
				},
			]}>
			<LinearGradient
				colors={[Colors.primary, "transparent"]}
				// colors={["transparent", "transparent"]}
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					height: headerHeight || 0 - 3,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	linearGradient: {
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
		marginTop: 16,
		width: 350,
	},
	buttonText: {
		fontSize: 18,
		textAlign: "center",
		margin: 10,
		color: "#ffffff",
		backgroundColor: "transparent",
	},
})
export default Header
