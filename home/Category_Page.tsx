import React from "react"
import {View, Text} from "react-native-ui-lib"
import {Dimensions} from "react-native"
import {useTheme} from "styled-components"

const Category_Page = () => {
	const theme = useTheme()
	return (
		<View flex-1 bg-background width={Dimensions.get("screen").width}>
			<Text imp>Category</Text>
		</View>
	)
}

export default Category_Page
