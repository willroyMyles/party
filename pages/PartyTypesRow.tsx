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
import SearchBar from '../components/SearchBar';
import FireStore from '../data_layer/FireStore';
import { GetPartytypeString } from '../universal/GS';
import { PartyType } from '../universal/Models';
const { width, height } = Dimensions.get( 'screen' );

const PartyTypesRow = ( { heightt }: { heightt: number } ) =>
{
    const theme = useTheme();
    const holder = useRef<TransitioningView | any>();
    const [visible, setVisible] = useState( true );
    const [data, setData] = useState<string[]>( [] );

    const loadFeed = () =>
    {
        FireStore.retrieve
            .events()
            .then( ( res ) =>
            {
                const keys = [...FireStore.categorizedData.keys()];
                setData( keys );
            } )
            .catch( ( err ) =>
            {
                const keys = [...FireStore.categorizedData.keys()];
                setData( keys );
            } );
    };

    return (
        <View
            center
            paddingV-10
            bg-green20
            style={{ width: '100%', height: heightt, borderWidth: 0 }}>
            {/* <SearchBar /> */}
            <Text
                marginT-5
                marginL-10
                marginB-5
                indicator
                style={{ alignSelf: 'flex-start' }}>
                Categories
      </Text>
            {data.length == 0 && (
                <TouchableOpacity onPress={loadFeed}>
                    <Text>load feed</Text>
                </TouchableOpacity>
            )}
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

const PartyCard = ( { item }: { item: string } ) =>
{
    const theme = useTheme();
    const navigation = useNavigation();
    const text = GetPartytypeString( PartyType[item] );
    const data = FireStore.categorizedData
        .get( item )
        ?.filter( ( item, index ) => index < 3 ); //limit data to three items
    const length = data?.length;
    const [index, setIndex] = useState( 0 );
    const [image, setimage] = useState<string>();
    const handleViewAll = ( route: string ) =>
        navigation.navigate( 'category', { type: route } );
    const view = useRef<TransitioningView>();

    useEffect( () =>
    {
    }, [] );

    const changeItem = () =>
    {
        if ( length == undefined ) return;
        let newIndex = 0;
        newIndex = index + 1 >= length ? 0 : index + 1;
        setIndex( newIndex );
        changeImage( newIndex );
    };

    const changeImage = ( i: number ) =>
    {
        FireStore.retrieve
            .imageFromReference( data[i].reference || '' )
            .then( ( res ) =>
            {
                setimage( res );
            } );
    };

    setTimeout( () =>
    {
        if ( view.current ) view.current.animateNextTransition();
        const CustomLayoutLinear = {
            duration: 700,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
        }

        LayoutAnimation.configureNext( CustomLayoutLinear )
        changeItem();
    }, 6000 );

    const transitions = (
        <Transition.Together>
            <Transition.Out type="scale" />
            <Transition.Change durationMs={1300} interpolation="linear" />
            <Transition.In type="slide-top" durationMs={1600} />
        </Transition.Together>
    );

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
                // elevation: 6,
            }}>
            {data?.map( ( value, idx ) =>
            {
                const isSelected = index == idx;

                if ( isSelected )
                    return (
                        <View
                            key={idx}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}>
                            {/* <Text>{value.title}</Text> */}
                            <Image
                                fadeDuration={300}
                                source={{ uri: image }}
                                style={{ width: '100%', height: '100%' }}
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
                                <Text lvl2 muted>{value.title}</Text>
                            </View>
                        </View>
                    );
            } )}

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    padding: 10,
                    paddingTop: 20,
                    backgroundColor: Colors.foreground,
                    width: '100%',
                }}>
                <Text lvl2>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};
