import { useNavigation, useTheme } from '@react-navigation/native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Dimensions, LayoutAnimation } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    Transition,
    Transitioning,
    TransitioningView,
} from 'react-native-reanimated';
import { View, Text, TouchableOpacity, Colors, Image } from 'react-native-ui-lib';
import { useSpring, animated } from 'react-spring/native';
import LoaderImage from '../components/LoaderImage';
import SearchBar from '../components/SearchBar';
import FireStore from '../data_layer/FireStore';
import { eventEmitter, eventStrings } from '../universal/EventEmitter';
import { getColorForType, GetPartytypeString } from '../universal/GS';
import { PartyType } from '../universal/Models';
const { width, height } = Dimensions.get( 'screen' );
// @refresh reset

const PartyTypesRow = ( { heightt }: { heightt: number } ) =>
{
    const theme = useTheme();
    const [data, setData] = useState<string[]>( [] );

    useEffect(() => {
        eventEmitter.addListener( eventStrings.categorizedDataLoaded, load )
        load()
        return () => {
            eventEmitter.removeListener( eventStrings.categorizedDataLoaded, load )
        }
    }, [] )
    
    const load = () =>
    {
        const keys = [...FireStore.categorizedData.keys()];              
        setData( keys );
    }

    const loadFeed = () =>
    {
        FireStore.retrieve
            .events()
            .then( ( res ) =>
            {
                load()
            } )
            .catch( ( err ) =>
            {
                load()
            } );
    };

    return (
        <View
            centerH
            paddingV-10
            bg-background
            style={{ width: '100%', height: heightt}}>
            {/* <SearchBar /> */}
            <Text
                marginT-5
                marginL-10
                marginB-5
                indicator
                style={{ alignSelf: 'flex-start' }}>
                Categories
            </Text>

            {data.length != 0 && (
                <FlatList
                    data={data}
                    horizontal
                    contentContainerStyle={{ height: '100%', paddingVertical: 10 }}
                    keyExtractor={( item, index ) => 'item' + index}
                    renderItem={( { item, index } ) =>
                    {

                        return (
                            <View center style={{ height: '100%' }}>
                                <PartyCard item={item} />
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
};

export default PartyTypesRow;

const PartyCardV2 = ( { item }: { item: any } ) =>
{
    const num : PartyType = Number.parseInt(PartyType[item])
    const text = GetPartytypeString( num );
    const data = [...FireStore.data.values()].filter( ( a, b ) => a.partyType == num )
    const amount = data.length


    return (<View center marginH-10>
        <Text lvl1 center>{text} </Text>
        <Text lvl1 center>type {num} </Text>
        <Text lvl1 center>amount {amount} </Text>
    </View>)
}

const PartyCard = ( { item }: { item: string } ) =>
{
    const theme = useTheme();
    const navigation = useNavigation();
    const type = PartyType[item]
    const text = GetPartytypeString( type );
    const amount = [...FireStore.data.values()].filter( ( a ) => a.partyType  == type ).length
    const data = FireStore.categorizedData
        .get( item )
        ?.filter( ( item, index ) => index < 3 ); //limit data to three items
    const length = data?.length;
    const [index, setIndex] = useState( 0 );
    const [image, setimage] = useState<string>();
    const handleViewAll = ( route: string ) =>
        navigation.navigate( 'category', { type: route } );
    
    const [props, set, stop] = useSpring(()=>(
        {   opacity:0,
            from: { opacity: 0 },
            to: { opacity: 1 },
            config: {
                duration:1000
            }
        }
    ) )
    
    const V = animated(View)

    const changeItem = () =>
    {
        if ( length == undefined ) return;
        let newIndex = 0;
        newIndex = index + 1 >= length ? 0 : index + 1;
        setIndex( newIndex );
        changeImage( newIndex );
        set({opacity:1})
    };

    const changeImage = ( i: number ) =>
    {
        FireStore.retrieve
            .imageFromReference( data[i].reference || '', data[i].flyer )
            .then( ( res ) =>
            {
                setimage( res );
            } );
    };

    setTimeout( () =>
    {
        const CustomLayoutLinear = {
            duration: 700,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        }

        LayoutAnimation.configureNext( CustomLayoutLinear )
        set({opacity:0})
        changeItem();
    }, 6000 );

    return (
        <TouchableOpacity
            center
            onPress={() => handleViewAll( item )}
            style={{
                marginHorizontal: 10,
                height: '100%',
                width: width * 0.4,
                borderRadius: 12,
                overflow: 'hidden',
                elevation: 8,
            }}>
            {data?.map( ( value, idx ) =>
            {
                const isSelected = index == idx;

                if ( isSelected )
                    return (
                        <V
                            key={idx}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            opacity: props.opacity
                            }}>
                            {/* <Text>{value.title}</Text> */}
                            <LoaderImage 
                                height="100%" 
                                width="100%"
                                uri={image}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 25.5,
                                    left: 0,
                                    width: '100%',
                                    zIndex: 2,
                                    paddingLeft: 9,
                                }}>
                                <Text lvl2 >{value.title}</Text>
                            </View>
                        </V>
                    );
            } )}

            <View
                row spread centerV
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    padding: 10,
                    paddingTop: 20,
                    backgroundColor: getColorForType(type, true),
                    width: '100%',
                }}>
                <Text lvl2 style={{color:getColorForType(type)}}>{text}</Text>
                {/* <View bg-background paddingH-5 center style={{ borderRadius:3}}>
                    <Text lvl2>{amount}</Text>
                </View> */}
            </View>
        </TouchableOpacity>
    );
};
