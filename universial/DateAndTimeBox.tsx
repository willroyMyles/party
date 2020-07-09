import React from "react"
import {View, Text} from "react-native-ui-lib"
import DateBox from "../components/DateBox"
import uiManager from "../dataLayer/UiManager"

const DateAndTimeBox = ({date, start, end, shadow}: {date: Date; start: Date; end: Date; shadow?: boolean}) => {
	return (
		<View row>
			<DateBox date={date} shadow={shadow} />
			<View marginL-20 bg-background br20 padding-10 paddingH-30 style={{elevation: shadow ? 12 : 0}}>
				<Text color={uiManager.theme.primary} imp1>
					{start}
				</Text>
				<Text hint style={{textAlign: "center"}}>
					to
				</Text>
				<Text imp1>{end}</Text>
			</View>
		</View>
	)
}

export default DateAndTimeBox
