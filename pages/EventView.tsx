import React, { useEffect, useRef, useState } from 'react';
import
    {
        View,
        Text,
        Image,
        Avatar,
        Colors,
        TouchableOpacity,
    } from 'react-native-ui-lib';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import FireStore from '../data_layer/FireStore';
import { Easing, ScrollView, StatusBar } from 'react-native';
import moment from 'moment';
import { FeedItemModel, PartyType } from '../universal/Models';
import tm from '../universal/UiManager';
import { GS, GetIcon, GetPartytypeString } from '../universal/GS';
import Organizer from '../components/Organizer';
import UseSmallMapView from './UseSmallMapView';
import PartyTypeBadge from '../components/PartyTypeBadge';
import RSVPButton from '../components/RSVPButton';
import EventHeaderImage from '../components/EventHeaderImage';
import LocationBlock from '../components/LocationBlock';
import { animated, useSpring } from 'react-spring/native';
import Share from 'react-native-share';
import rnfb from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EventView = () =>
{
    const [image, setImage] = useState<string>();
    const [base64, setBase64] = useState<string>( '' );
    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();
    const reference = route.params?.reference;
    const item: FeedItemModel = FireStore.data.get( reference );

    const getBase64 = () =>
    {
        rnfb
            .fetch( 'GET', item.imageUrl )
            .then( ( res ) =>
            {
                setBase64( res.base64() );
            } )
            .catch( ( err ) => console.log( err ) );
    };

    const onShare = async () =>
    {
        let shareImage = 'data:image/png;base64,' + base64;

        const { title, description, date, duration, reference } = item;



        const actualDate = moment( date ).format( "MMM M, YYYY" );
        Share.open( {
            title: `${ title }\n`,
            message: `${ description }\n http://myparty.com/${ reference }`,
            url: shareImage,
            failOnCancel: true
        } ); 
    };

    useEffect( () =>
    {
        async function getImage()
        {
            const d = await FireStore.retrieve.imageFromReference(
                item.reference,
                item.flyer,
            );
            item.imageUrl = d;
            setImage( d );
        }

        if ( item )
        {
            getImage();
            getBase64();
        }
    }, [] );

    if ( item )
        return (
            <ScrollView
                contentContainerStyle={{
                    backgroundColor: Colors.background,
                    minHeight: '100%',
                    paddingBottom: 40,
                }}>
                <StatusBar animated backgroundColor={'rgba(0,0,0,0)'} />
                <EventHeaderImage imageUrl={image} />
                <View
                    style={
                        {
                            // transform: [{ translateY: sp.y }],
                            // opacity:sp.opacity
                        }
                    }>
                    <View centerH>
                        <PartyTypeBadge type={item?.partyType} />
                    </View>
                    <View bg-background padding-20 style={{ marginTop: -10 }}>
                        <View marginV-5 centerV row spread>
                            <Text lvl1>{item.title}</Text>
                            <View row spread center>
                                <RSVPButton reference={item.reference} />
                                <TouchableOpacity onPress={onShare} marginB-7 marginL-12>
                                    <Icon name="share-alt" size={22} color={Colors.text1} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View marginT-20 row>
                            <GetIcon name="calendar" />
                            <View marginL-10>
                                <Text lvl3 text3>
                                    Date
                </Text>
                                <Text regular>
                                    {moment( new Date( item.date ) ).format( 'ddd - MMM DD, YYYY' )}
                                </Text>
                            </View>
                        </View>
                        <View marginT-20 row>
                            <GetIcon name="clock" />
                            <View marginL-10>
                                <Text lvl3 text3>
                                    Time
                </Text>
                                <Text lvl2>
                                    {moment( new Date( item.start || '' ) ).format( 'hh:mm A' )} for{' '}
                                    {item.duration} hrs
                </Text>
                            </View>
                        </View>
                        <View marginT-20 row>
                            <GetIcon name="info" />
                            <View marginL-10>
                                <Text marginT-7 marginB-3 lvl3 text3>
                                    Description
                </Text>
                                <Text lvl2>{item.description}</Text>
                            </View>
                        </View>

                        <View marginT-20 row>
                            <GetIcon name="map" />
                            <View marginL-10>
                                <Text marginT-7 marginB-3 lvl3 text3>
                                    Location
                </Text>
                                <LocationBlock {...item.locationObject} styled={true} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <UseSmallMapView loc={item.location} />
                    </View>

                    <Organizer
                        org
                        name={item.person || ''}
                        reference={item.reference || ''}
                    />
                </View>
            </ScrollView>
        );
    else return <View />;
};

export default EventView;
