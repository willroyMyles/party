import React, {PureComponent} from "react"
import {Animated, Dimensions, StyleSheet} from "react-native"
import {View, Text} from "react-native-ui-lib"

const {height} = Dimensions.get("screen")
interface CC {
	title: string
	text: string
	color: string
	icon?: any
	timing: number
}
class TToast extends PureComponent {
	static toastInstance: TToast

	static show(config: CC) {
		console.log(config, this.toastInstance)

		this.toastInstance.start(config)
	}

	static hide() {
		this.toastInstance.hideToast()
	}

	constructor(props: Readonly<{}>) {
		super(props)

		TToast.toastInstance = this
	}

	state = {
		toast: new Animated.Value(height),
		title: "",
		text: "",
		color: "",
		icon: "",
		timing: 0,
	}

	start(config: CC) {
		console.log(config)

		this.setState({
			title: config.title,
			text: config.text,
			color: config.color,
			icon: config.icon,
			timing: config.timing,
		})

		Animated.spring(this.state.toast, {
			toValue: height - 130,
			bounciness: 15,
			useNativeDriver: true,
		}).start()

		const duration = config.timing > 0 ? config.timing : 5000

		setTimeout(() => {
			this.hideToast()
		}, duration)
	}

	hideToast() {
		Animated.timing(this.state.toast, {
			toValue: height,
			duration: 300,
			useNativeDriver: true,
		}).start()
	}

	render() {
		const {title, text, icon, color} = this.state
		return (
			<Animated.View
				// ref={(c : any) => (this._root = c)}
				style={[
					styles.toast,
					{
						transform: [{translateY: this.state.toast}],
					},
				]}>
				<View style={[styles.timing, {backgroundColor: color || "transparent"}]} />
				<View style={styles.content}>
					<Text style={[styles.title, {color}]}>{title}</Text>
					<Text style={styles.subtitle}>{text}</Text>
				</View>

				<View style={[styles.iconStatus, {backgroundColor: color || "transparent"}]}>{icon}</View>
			</Animated.View>
		)
	}
}

export default TToast

const styles = StyleSheet.create({
	toast: {
		position: "absolute",
		width: "80%",
		alignSelf: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
		minHeight: 90,
		shadowColor: "#ccc",
		alignItems: "center",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		flexDirection: "row",
	},
	timing: {
		borderRadius: 10,
		height: 5,
		width: "100%",
		backgroundColor: "#f1f1f1",
		position: "absolute",
		top: 0,
	},
	content: {
		width: "90%",
		paddingLeft: 20,
		paddingRight: 20,
	},
	title: {
		color: "#f1f1f1",
		fontWeight: "600",
		fontSize: 16,
	},
	subtitle: {
		marginTop: 5,
		fontWeight: "300",
		fontSize: 13,
	},
	img: {
		resizeMode: "contain",
		width: 20,
		height: 20,
	},
	iconStatus: {
		width: 40,
		height: 40,
		backgroundColor: "#f1f1f1",
		borderRadius: 50,
		position: "absolute",
		right: -20,
		justifyContent: "center",
		alignItems: "center",
	},
})
