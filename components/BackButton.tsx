import React from "react"
import {View, Text, Colors, TouchableOpacity} from "react-native-ui-lib"
import Icon from "react-native-vector-icons/Feather"
import {useNavigation, useRoute} from "@react-navigation/native"

const BackButton = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const {routes} = navigation.dangerouslyGetState()
	const currentIndex = routes.length
	console.log(currentIndex, routes)

	const handlePress = () => navigation.navigate(routes[currentIndex - 2].name)

	return (
		<View absT marginT-40 marginL-20 bg-background br100 padding-10 style={{opacity: 1, elevation: 10}}>
			<TouchableOpacity onPress={handlePress}>
				<Icon name="chevron-left" size={32} color={Colors.textColor} style={{elevation: 5}} />
			</TouchableOpacity>
		</View>
	)
}

export default BackButton
