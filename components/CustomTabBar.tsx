import React, {useState, ReactNode, useEffect} from "react"

import {View, TouchableOpacity, Text} from "react-native"
import Animated from "react-native-reanimated"
import Icon from "react-native-vector-icons/Feather"
import {Colors} from "react-native-ui-lib"

export function CustomTabBar({
	state,
	descriptors,
	navigation,
	position,
}: {
	state: any
	descriptors: any
	navigation: any
	position: any
}) {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-around",
				borderTopWidth: 2,
				borderTopColor: "rgba(200,200,200,.1)",
			}}>
			{state.routes.map((route: any, index: number) => {
				const {options} = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					})
				}

				const inputRange = state.routes.map((_: any, i: number) => i)
				const opacity = Animated.interpolate(position, {
					inputRange,
					outputRange: inputRange.map((i: number) => (i === index ? 1 : 0.35)),
				})

				const name = state.routes[index].key
				const iconName = descriptors[name].options.tabBarIcon().props.name

				return (
					<TouchableOpacity
						key={index}
						accessibilityRole="button"
						accessibilityStates={isFocused ? ["selected"] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{
							flex: 1,
							borderWidth: 0,
							alignItems: "center",
							justifyContent: "center",
							padding: 20,
							flexDirection: "row",
						}}>
						<Animated.View style={{opacity, paddingEnd: 10}}>
							<Icon name={iconName} size={20} color={Colors.primary} />
						</Animated.View>
						<Animated.Text style={{opacity, fontSize: 16, textTransform: "uppercase", color: Colors.primary}}>
							{label}
						</Animated.Text>
					</TouchableOpacity>
				)
			})}
			<TouchableOpacity
				accessibilityRole="button"
				activeOpacity={0.8}
				onPress={() => {
					navigation.navigate("create_event")
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
		</View>
	)
}

export default CustomTabBar

// ...
