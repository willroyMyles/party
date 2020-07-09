import React from "react"
import {View, Text} from "react-native-ui-lib"
import {Colors} from "react-native/Libraries/NewAppScreen"
import moment from "moment"
import {useTheme} from "styled-components"
import uiManager from "../dataLayer/UiManager"

const DateBox = ({date, shadow}: {date: Date | undefined; shadow?: boolean}) => {
	const theme = useTheme()
	if (date == undefined) return <View></View>
	return (
		<View
			padding-5
			br20
			bg-background
			style={{elevation: shadow ? 17 : 0, alignItems: "center", justifyContent: "center", width: "20%"}}>
			<Text color={uiManager.theme.primary} imp>
				{moment(date).format("D")}
			</Text>
			<Text imp1>{moment(date).format("MMM")}</Text>
		</View>
	)
}

export default DateBox
