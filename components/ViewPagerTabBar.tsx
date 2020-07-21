import React, {useState} from "react"
import {View, Text, Animated, Dimensions} from "react-native"
import {TouchableOpacity, Colors} from "react-native-ui-lib"
import Icon from "react-native-vector-icons/Feather"
import {useTheme} from "styled-components"
const {width} = Dimensions.get("screen")
const ViewPagerTabBar = ({names, position}: {names: any[]; position: Animated.Value}) => {
	const [idx, setIdx] = useState(0)
	const theme = useTheme()

	const XOffset = position.interpolate({
		inputRange: [0, names.length - 1],
		outputRange: [0, width / names.length],
	})

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-around",
				borderTopWidth: 2,
				borderTopColor: "rgba(200,200,200,.1)",
				backgroundColor: Colors.background,
			}}>
			<Animated.View
				style={{
					position: "absolute",
					left: XOffset,
					top: 0,
					height: "100%",
					width: width / names.length,
					paddingHorizontal: 10,
					paddingVertical: 6,
				}}>
				<View
					style={{
						// backgroundColor: "rgba(0,0,0,.2)",
						backgroundColor: Colors.primary,
						opacity: 0.1,
						height: "100%",
						width: "100%",
						borderRadius: 30,
						elevation: 30,
					}}
				/>
			</Animated.View>
			{names.map((obj, index) => {
				const {name, iconName, press} = obj
				const isFocused = idx === index

				// const inputRange = names.map((_: any, i: number) => i)
				// const opacity = Animated.interpolate(position, {
				// 	inputRange,
				// 	outputRange: inputRange.map((i: number) => (i === index ? 1 : 0.35)),
				// })

				return (
					// <Animated.View key={index}>
					<TouchableOpacity
						key={index}
						onPress={() => press(index)}
						activeOpacity={0.8}
						style={{
							flex: 1,
							borderWidth: 0,
							alignItems: "center",
							justifyContent: "center",
							padding: 20,
							flexDirection: "row",
						}}>
						<View style={{paddingEnd: 10}}>
							<Icon name={iconName} size={20} color={Colors.primary} />
						</View>
						<Text style={{fontSize: 16, textTransform: "uppercase", color: Colors.primary}}>{name}</Text>
					</TouchableOpacity>
					// </Animated.View>
				)
			})}
			{/* {names.map((obj: any, index: number) => {

				const isFocused = idx === index
				const {name, iconName} = obj

				const onPress = () => {
					// const event = navigation.emit({
					// 	// type: "tabPress",
					// 	// target: route.key,
					// 	// canPreventDefault: true,
					// })
					// if (!isFocused && !event.defaultPrevented) {
					// 	// navigation.navigate(route.name)
					// }
				}

				// const onLongPress = () => {
				// 	navigation.emit({
				// 		type: "tabLongPress",
				// 		target: route.key,
				// 	})
				// }

			

				// const name = names[index].key
				// const iconName = descriptors[name].options.tabBarIcon().props.name

				return (
					<TouchableOpacity
						key={index}
						accessibilityRole="button"
						accessibilityStates={isFocused ? ["selected"] : []}
						// accessibilityLabel={options.tabBarAccessibilityLabel}
						// testID={options.tabBarTestID}
						onPress={onPress}
						// onLongPress={onLongPress}
						style={{
							flex: 1,
							borderWidth: 0,
							alignItems: "center",
							justifyContent: "center",
							padding: 20,
							flexDirection: "row",
						}}>
						<View style={{opacity: 1, paddingEnd: 10}}>
							<Icon name={iconName} size={20} color={Colors.primary} />
						</View>
						<Text style={{opacity: 1, fontSize: 16, textTransform: "uppercase", color: Colors.primary}}>{name}</Text>
					</TouchableOpacity>
				)
			})} */}
		</View>
	)
}

export default ViewPagerTabBar

const Middle_Button = () => {
	return (
		<TouchableOpacity
			accessibilityRole="button"
			activeOpacity={0.8}
			onPress={() => {
				// navigation.navigate("create_event")
			}}
			style={{
				flex: 0.2,
				alignItems: "center",
				padding: 15,
				position: "absolute",
				left: "50%",
				marginStart: -30,
				marginTop: -20,
				borderWidth: 0.1,
				borderRadius: 100,
				elevation: 4,
				overflow: "hidden",
				zIndex: 1,

				backgroundColor: Colors.primary,
			}}>
			<Icon name="plus" style={{fontWeight: "700", textShadowRadius: 2}} color={Colors.background} size={20} />
		</TouchableOpacity>
	)
}
