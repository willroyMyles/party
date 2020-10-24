import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text } from 'react-native-ui-lib'
import { FeedItemModel, PartyType } from '../../universal/Models'

const LeaderBoardPage = ( { type }: { type: PartyType } ) =>
{
    

    const [data, setData] = useState<FeedItemModel[]>([])




    return (
        <View flex>
            <FlatList
                data={data}
                renderItem={( { item, index } ) =>
                {
                    return (
                        <View>
                            <Text>{type}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default LeaderBoardPage
