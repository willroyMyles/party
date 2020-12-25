import React, { useState, useEffect, useMemo, memo } from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { FeedItemModel, PartyType } from '../universal/Models'
import { Dimensions } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import moment from 'moment'
import DateBox from './DateBox'
import { useNavigation } from '@react-navigation/native'
import FireStore from '../data_layer/FireStore'
import PartyTypeBadge from './PartyTypeBadge'
const { width, height } = Dimensions.get( "screen" )
import FastImage from 'react-native-fast-image'
import { GetIcon } from '../universal/GS'


const FeedItemMemoryVersionOne = memo( ( { item }: { item: FeedItemModel } ) =>
{

    if ( !item )
    {
        return <View />
    }

    const theme = useTheme()
    const navigation = useNavigation()
    const [image, setimage] = useState<string>()

    useEffect( () =>
    {
        async function getImage()
        {
            const d = await FireStore.retrieve.imageFromReference( item.reference, item.flyer )
            setimage( d )
        }

        getImage()

    }, [] )

    const handleClick = () =>
    {
        navigation.navigate( "view past event", { reference: item?.reference } )
    }

    return (
        <View
            style={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginVertical: 10,
                width,
                paddingBottom: 0
            }}>
            <TouchableOpacity
                onPress={() => handleClick()}
                activeOpacity={0.85}
                marginV-8
                bg-foreground

                style={{ borderWidth: 0, borderRadius: 3, elevation: 0, borderColor: Colors.grey50, overflow: "hidden" }}>
                {/* <BackDrop /> */}
                <View>
                    <View style={{ elevation: 5 }} center>
                        <FastImage
                            style={{ width: "100%", height: 200 }}
                            source={{
                                uri: image,
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    <View
                        row
                        paddingH-10
                        paddingT-7
                        marginV-7
                        style={{ flex: 2, flexDirection: "column", justifyContent: "space-between" }}>
                        <Text lvl1>{item.title}</Text>
                        <View row spread style={{marginStart:-8}}>
                            <View>
                                <View marginV-3 row centerV>
                                    <GetIcon name="calendar" />
                                    <Text marginL-3 regular>{moment( new Date( item.date || "" ) ).format( "ddd MMM DD, YYYY" )}</Text>
                                </View>

                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
});

export default FeedItemMemoryVersionOne
