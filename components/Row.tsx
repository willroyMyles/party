import React, {ReactNode, Component} from "react"
import {View, Text} from "react-native-ui-lib"
import {ContainerModifiers} from "react-native-ui-lib/generatedTypes/commons/new"
import {ViewProps} from "react-native-ui-lib/typings"
import uiManager from "../dataLayer/UiManager"

class Row extends Component<ContainerModifiers> {
	render() {
		return (
			<View {...this.props} row spread padding-10 marginV-5>
				{this.props.children}
			</View>
		)
	}
}

export default Row
