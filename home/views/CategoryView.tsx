import React from "react"
import {View, Text, Colors} from "react-native-ui-lib"
import {useRoute} from "@react-navigation/native"
import {PartyType} from "../../universial/Models"
import uiManager from "../../dataLayer/UiManager"
import {FlatList} from "react-native-gesture-handler"

const CategoryView = () => {
	const section = useRoute().params
	const type = PartyType[section]

	return (
		<View>
			<View
				row
				paddingH-15
				paddingV-10
				paddingT-35
				marginB-5
				paddingR-50
				// marginT-30
				style={{
					justifyContent: "space-between",
					// backgroundColor: uiManager.theme.bgHilight,
					// elevation: 2,
					borderBottomWidth: 2,
					// borderTopWidth: 2,
					borderColor: uiManager.theme.bgHilight,
				}}>
				<Text imp1 color={Colors.primary}>
					{section}
				</Text>
			</View>
			{/* <FlatList
                

            
            /> */}
		</View>
	)
}

export default CategoryView
