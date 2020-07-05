import React from "react"
import {Button, Colors, View, Text} from "react-native-ui-lib"
import {useNavigation} from "@react-navigation/native"

const SkipButton = ({where}: {where: string}) => {
	const navigation = useNavigation()

	return (
		<View marginT-90 paddingH-30 centerH style={{opacity: 0.7}}>
			<Button
				style={{borderRadius: 7, width: "50%"}}
				size="xSmall"
				onPress={() => navigation.navigate(where)}
				outline
				outlineColor={Colors.primary}>
				<Text desc color={Colors.primary}>
					skip
				</Text>
			</Button>
		</View>
	)
}

export default SkipButton
