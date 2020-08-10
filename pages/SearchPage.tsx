import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import SearchComponent from '../components/SearchComponent'
import { useTheme } from 'styled-components'

const SearchPage = () =>
{
    const theme = useTheme()
    return (
        <View flex bg-background>
            <SearchComponent />
        </View>
    )
}

export default SearchPage
