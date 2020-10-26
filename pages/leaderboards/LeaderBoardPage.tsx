import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text } from 'react-native-ui-lib'
import LeaderBoardTiles from '../../components/LeaderBoardTiles'
import LeaderBoardTilesV2 from '../../components/LeaderBoardTilesV2'
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
        setData( await (await FireStore.retrieve.getLeaderboardPartyByType( partyType )).reverse() );
    }

    return (
        <View bg-background padding-7 style={{height:"100%"}}>
            <FlatList
                data={data}
                contentContainerStyle={{height:"100%"}}

                keyExtractor={(item, index)=> item.reference + index}
                renderItem={( { item, index } ) =>
                {
                    return (
                        <View >
                            <LeaderBoardTilesV2 index={index} item={item} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default LeaderBoardPage
