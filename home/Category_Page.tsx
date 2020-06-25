import React from "react"
import {View, Text} from "react-native-ui-lib"
import {Dimensions} from "react-native"

const Category_Page = () => {
	return (
		<View flex-1 bg-background width={Dimensions.get("screen").width}>
			<Text imp>Category</Text>
		</View>
	)
}

export default Category_Page
