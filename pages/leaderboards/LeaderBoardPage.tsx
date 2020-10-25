import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text } from 'react-native-ui-lib'
import LeaderBoardTiles from '../../components/LeaderBoardTiles'
import FireStore from '../../data_layer/FireStore'
import { FeedItemModel, PartyType } from '../../universal/Models'

const LeaderBoardPage = ( { type }: { type: string } ) =>
{
    

    const [data, setData] = useState<FeedItemModel[]>([])
    const partyType = PartyType[type];

    useEffect(() => {
        handleDataRetrival();
    }, [] )
    
    const handleDataRetrival = async () => {
        setData( await FireStore.retrieve.getLeaderboardPartyByType( partyType ) );
    }

    return (
        <View bg-foreground padding-10 style={{height:"100%"}}>
            <Text lvl1>{type}</Text>
            <FlatList
                data={data}

                keyExtractor={(item, index)=> item.reference + index}
                renderItem={( { item, index } ) =>
                {
                    return (
                        <View >
                            <LeaderBoardTiles index={index} item={item} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default LeaderBoardPage
