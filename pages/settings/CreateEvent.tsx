import React, { useState, useRef, createRef } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import
{
    View,
    Text,
    TouchableOpacity,
    Colors,
    TextField,
    Image,
    Picker,
    Dialog,
    TextArea,
} from 'react-native-ui-lib';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackDrop from '../../components/BackDrop';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Region } from 'react-native-maps';
import { getImage } from '../../universal/GetImage';
import { GS } from '../../universal/GS';
import FireStore from '../../data_layer/FireStore';
import { FeedItemModel, PartyType } from '../../universal/Models';
import TToast from '../../components/TToast';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Flyer
{
    flyer: string;
    title: string;
    description: string;
    date: Date;
    start: Date;
    duration: number;
    location: string;

    partyType: PartyType
}

const CreateEvent = () =>
{
    const theme = useTheme();
    const col = Colors.grey30;
    const { handleSubmit, errors, control, clearErrors, setValue } = useForm<
        Flyer
    >();
    const navigation = useNavigation();

    const [image, setImage] = useState<string | null>( null );
    const [dialogVisible, setdialogVisible] = useState( false )

    const [dateValue, setDateValue] = useState<string>();
    const [timeValue, setTimeValue] = useState<string>();
    const [dateShown, setDateShown] = useState( false );
    const [timeShown, settimeShown] = useState( false );

    const onStartChange = ( event: any, selectedDate: Date | undefined ) =>
    {
        settimeShown( false );
        setValue( 'start', selectedDate );
        setTimeValue( moment( selectedDate ).format( 'hh:mm A' ) );
    };

    const onDateChange = ( event: any, selectedDate: Date | undefined ) =>
    {
        setDateShown( false );
        setDateValue( moment( selectedDate ).format( 'MMM D, yy' ) );
        setValue( 'date', selectedDate );
    };

    const handleShowDate = () =>
    {
        Keyboard.dismiss();
        setDateShown( true );
    };

    const handleShowTime = () =>
    {
        Keyboard.dismiss();
        settimeShown( true );
    };

    const onSubmit = ( data: FeedItemModel ) =>
    {
        if ( typeof data.duration == typeof '' )
        {
            const str: string = data.duration + '';
            data.duration = Number.parseFloat( str );
        }

        data.partyType = PartyType[data.partyType]
        data.date = data.date?.toString()
        data.start = data.start?.toString()
        FireStore.send
            .sendEvent( data )
            .then( ( res ) =>
            {
                TToast.success( "Great!", 'Event Created' )
                navigation.navigate( "home" )
            } )
            .catch( ( err ) => TToast.error( 'oh my!', err ) );
    };

    const onLocation = ( loc: Region ) =>
    {
        setValue( 'location', [loc?.latitude, loc?.longitude].toString() );
    };

    const getFlyer = async () =>
    {
        getImage().then( ( res: any ) =>
        {
            if ( !res.cancelled )
            {
                setImage( res.uri );
                setValue( 'flyer', res.uri );
                clearErrors( 'flyer' );
            }
        } );
    };

    const p = Object.values( PartyType ).filter( ( value ) => typeof 9 != typeof value )
    const showDialog = () =>
    {
        setdialogVisible( true )
        Keyboard.dismiss()
    }

    const setParty = ( index: number ) =>
    {
        setValue( "partyType", PartyType[index] )
        setdialogVisible( false )

    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background }}>
            <BackDrop />

        <ScrollView contentContainerStyle={{ minHeight: "100%" }} >
                <Dialog onDismiss={() => setdialogVisible( false )} visible={dialogVisible} containerStyle={{
                    backgroundColor: Colors.background,
                    padding: 10,
                    borderRadius: 7,
                }}>
                    <ScrollView style={{ height: "90%" }}>
                        <Text margin-9 >Party type options</Text>
                        {p.map( ( value, index ) =>
                        {
                            const name = value.toString().replace( '_', " " ).toLowerCase()
                            return <TouchableOpacity key={index} onPress={() => setParty( index )} padding-9 marginV-2 style={{ borderWidth: .5, borderRadius: 3, borderColor: Colors.text2 }}>
                                <Text lvl1>{name}</Text>
                            </TouchableOpacity>

} )}
                        <View paddingV-10 />
                    </ScrollView>
            </Dialog>
            

                {dateShown && (
                    <DateTimePicker
                    onChange={( e, d ) =>
                        {
                            onDateChange( e, d );
                        }}
                        mode="date"
                        value={new Date()}
                        />
                        )}
            
                {timeShown && (
                    <DateTimePicker
                    onChange={( e, d ) =>
                        {
                            onStartChange( e, d );
                        }}
                        mode="time"
                        value={new Date()}
                        />
                        )}




            <View center paddingV-90>
                <TouchableOpacity
                    onPress={getFlyer}
                    center
                    style={[
                        style.upload,
                        { backgroundColor: Colors.foreground, },
                    ]}>
                    <Controller
                        defaultValue=""
                        control={control}
                        name="flyer"
                        rules={{ required: 'A flyer is required' }}
                        />
                    <View marginV-15>
                        <Icon name="image" color={col} size={43} />
                        <Icon
                            name="plus"
                            color={col}
                            size={16}
                            style={{
                                position: 'absolute',
                                bottom: -5,
                                right: -8,
                                backgroundColor: Colors.background,
                                padding: 3,
                                borderRadius: 50,
                            }}
                            />
                    </View>
                    <Text marginB-25 btn uppercase color={col}>upload image</Text>
                    {image && (
                        <View
                        absT
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,.3)',
                        }}>
                            <Image source={{ uri: image }} resizeMode="cover" cover />
                        </View>
                    )}
                </TouchableOpacity>
                {errors.flyer && <Text>{errors.flyer.message}</Text>}
                {Image != null && (
                    //TODO animte in future
                    <View
                    style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        width: '90%',
                        zIndex: 5,
                        top: image ? 0 : '-300%',
                    }}>
                        <TouchableOpacity
                            onPress={() =>
                                {
                                    setImage( null );
                                }}
                                row
                                bg-background
                                style={{ borderRadius: 4 }}>
                            <Text>clear image</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View bg-foreground style={style.cont}>
                    <Controller
                        defaultValue=""
                        
                        name="title"
                        control={control}
                        rules={{ required: 'title required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                hideUnderline
                                error={errors.title ? errors.title.message : ''}
                                maxLength={16}
                                onChangeText={( e: any ) => onChange( e )}
                                onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'title' );
                                    }}
                                    value={value}
                                    title="Title"
                                    style={[GS.input, { backgroundColor: Colors.background, color: Colors.text1, width: "100%" }]}
                                    
                                    />
                                    );
                                }}
                                />
                    <Controller
                        defaultValue=""
                        
                        name="description"
                        control={control}
                        rules={{ required: 'description required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                hideUnderline
                                error={errors.description ? errors.description.message : ''}
                                showsMaxLength
                                onChangeText={( e: any ) => onChange( e )}
                                onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'description' );
                                    }}
                                    value={value}
                                    title="Description"
                                    style={[GS.input, { backgroundColor: Colors.background, color: Colors.text1, width: "100%" }]}
                                    
                                    />
                                    );
                                }}
                                />

                    <Controller
                        name="partyType"
                        defaultValue=""
                        
                        control={control}
                        rules={{ required: 'party type required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                hideUnderline
                                error={errors.partyType ? errors.partyType.message : ''}
                                maxLength={16}
                                showsMaxLength
                                onFocus={() => showDialog()}
                                
                                onChangeText={( e: any ) => onChange( e )}
                                onBlur={() =>
                                    {
                                        setdialogVisible( true )
                                        onBlur();
                                        clearErrors( 'partyType' );
                                    }}
                                    value={value}
                                    title="Party Type"
                                    style={[GS.input, { backgroundColor: Colors.background, color: Colors.text1, width: "100%" }]}
                                    
                                    />
                                    );
                                }}
                                />
                </View>

                <View row spread bg-foreground style={style.cont}>
                    <Controller
                        defaultValue=""
                        
                        name="date"
                        control={control}
                        rules={{ required: 'date required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            const ref = useRef()
                            return (
                                <TextField
                                allowFontScaling
                                hideUnderline
                                error={errors.date ? errors.date.message : ''}
                                maxLength={16}
                                onFocus={handleShowDate}
                                // onChangeText={(value: any) => onChange(value)}
                                value={dateValue}
                                title="Event Date"
                                    autoGrow
                                    style={[[GS.input, { backgroundColor: Colors.background, color: Colors.text1, width: "100%" }], { width: '40%' }]}
                                    
                                    />
                                    );
                                }}
                                />
                    <Controller
                        name="start"
                        control={control}
                        rules={{ required: 'start required' }}
                        defaultValue=""
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                hideUnderline
                                error={errors.start ? errors.start.message : ''}
                                maxLength={16}
                                showsMaxLength
                                defaultValue=""
                                
                                onFocus={handleShowTime}
                                // onChangeText={(e: any) => onChange(e)} onBlur={() => {
                                    //     onBlur()
                                    //     clearErrors("start")
                                    // }}
                                    value={timeValue}
                                    title="Start Time"
                                    style={[GS.input, { backgroundColor: Colors.background, color: Colors.text1 }]}
                                    
                                    />
                                    );
                                }}
                                />
                    <Controller
                        name="duration"
                        defaultValue=""
                        control={control}
                        rules={{ required: 'duration required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <View center row style={{ width: '30%' }}>
                                    <TextField
                                        hideUnderline
                                        error={errors.duration ? errors.duration.message : ''}
                                        maxLength={16}
                                        showsMaxLength
                                        
                                        onChangeText={( e: any ) => onChange( e )}
                                        onBlur={() =>
                                            {
                                                onBlur();
                                                clearErrors( 'duration' );
                                            }}
                                            value={value}
                                            title="Duration"
                                            keyboardType="numeric"
                                            style={[
                                                [GS.input, { backgroundColor: Colors.background, color: Colors.text1 }],
                                                {
                                                    width: '70%',
                                                    marginStart: 0,
                                                    textAlign: 'center',
                                                    paddingEnd: 10,
                                                },
                                            ]}
                                            
                                            />
                                    <Text style={{ color: Colors.grey40, margin: 5 }}>Hr</Text>
                                </View>
                            );
                        }}
                        />
                </View>

                <View bg-foreground style={style.cont}>
                    <Controller
                        name="location"
                        control={control}
                        rules={{ required: 'location required' }}
                        defaultValue=""
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                hideUnderline
                                error={errors.location ? errors.location.message : ''}
                                maxLength={16}
                                onFocus={() =>
                                    navigation.navigate( 'useMap', { set: onLocation } )
                                }
                                onChangeText={( e: any ) => onChange( e )}
                                onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'location' );
                                    }}
                                    value={value}
                                    style={[GS.input, { backgroundColor: Colors.background, color: Colors.text1, width:"100%" }]}
                                    title="Location"
                                    />
                                    );
                                }}
                                />
                </View>

                    <TouchableOpacity
                        bg-background
                    onPress={() =>
                        {
                            handleSubmit( onSubmit )();
                        }}
                        activeOpacity={0.8}
                        center
                        style={style.btn}>
                    <BackDrop />
                    <Text btn uppercase style={{ padding: 10, textShadowRadius: 0.4 }}>create party</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
</SafeAreaView>
    );
};

export default CreateEvent;

const style = StyleSheet.create( {
    upload: {
        borderRadius: 7,
        width: '90%',
        overflow: 'hidden', minHeight: "20%", elevation: 1

    },
    cont: {
        padding: 20,
        borderRadius: 7,
        marginTop: 20,
        width: '90%',
        elevation: 1
    },

    btn: {
        padding: 14,
        width: '90%',
        borderRadius: 7,
        overflow: "hidden",
        elevation: 15,
        marginTop: 20,
        marginBottom: 20,
    },
} );
