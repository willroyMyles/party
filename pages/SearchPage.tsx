import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import SearchComponent from '../components/SearchComponent'
import { useTheme } from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchPage = () =>
{
    const theme = useTheme()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View flex bg-background>
                <SearchComponent />
            </View>
        </SafeAreaView>
    )
}

export default SearchPage
