import React from 'react'
import { View, Text, LoaderScreen } from 'react-native-ui-lib'

const ListFooterComp = ({loading, loadMore} : {loading:boolean, loadMore:boolean}) => {
    return (
        <View center>
            {loading && loadMore && <View>
                <LoaderScreen />
                <Text>loading</Text>
            </View>}

            {!loading && !loadMore && <View>
                <Text indicator>No more parties</Text>
            </View>}
        </View>
    )
}

export default ListFooterComp
