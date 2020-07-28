import React from "react"
import {View, Text, Button} from "react-native-ui-lib"
import {useTheme} from "styled-components"

const AgeDisclaimer = () => {
	const theme = useTheme()
	return (
		<View>
			<Text imp>You must be 18+ to use this app</Text>
			<View>
				<Button>
					<Text btn>i am over 18</Text>
				</Button>
				<Button>
					<Text btn>i am under 18</Text>
				</Button>
			</View>
		</View>
	)
}

export default AgeDisclaimer
