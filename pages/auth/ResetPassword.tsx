import React, { useState, useRef } from 'react'
import { View, Text, TextField, Button, TouchableOpacity, Colors } from 'react-native-ui-lib'
import { useForm, Controller } from 'react-hook-form';
import { GS } from '../../universal/GS';
import { Transitioning, Transition } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import { BackDropV3 } from '../../components/BackDrop';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import FireStore from '../../data_layer/FireStore';
import TToast from '../../components/TToast';
import { useNavigation } from '@react-navigation/native';

const transitions = (
    <Transition.Sequence>
        <Transition.Out type="slide-left" />
        <Transition.Change durationMs={300} interpolation="easeIn" />
        <Transition.In type="slide-right" />
    </Transition.Sequence>
)

const EnterPassword = ( { setIndex, reference }: { setIndex: any, reference: React.MutableRefObject<any> } ) =>
{

    const navigation = useNavigation()
    const handlePress = () => navigation.navigate( "home" )
    return <View center spread style={{ minHeight: "100%" }}>
        <Text lvl1 >
            Reset email sent!
        </Text>
        <TouchableOpacity
            onPress={( e: any ) =>
            {
                handlePress()
            }}
            center
            activeOpacity={.85}
            style={[{
                width: '50%',
                padding: 5,
                borderRadius: 6,
                marginTop: 10,
                overflow: "hidden",
                elevation: 10,
                borderWidth: 0.6,
                backgroundColor: Colors.foreground,
                borderColor: Colors.foreground
            }]}>
            <Text btn>Okay!</Text>
            <BackDropV3 />
        </TouchableOpacity>
    </View>
}

const SendEmail = ( { setIndex, reference }: { setIndex: any, reference: React.MutableRefObject<any> } ) =>
{

    const { handleSubmit, errors, control, clearErrors } = useForm();

    const handlePress = ( data: any ) =>
    {
        FireStore.auth.resetPassword( data.email ).then( res =>
        {
            setIndex( 1 )
            reference.current.animateNextTransition()
        } ).catch( err =>
        {
            TToast.error( "Oops!", "Something went wrong..." )
        } )

    }

    return <View paddingB-30 centerH style={{ minHeight: "100%" }}>

        <Text welcome primary margin-20>Forgot password?</Text>
        <Text regular margin-20>Enter your registered email and we'll send an one time password for you to log in. </Text>

        <Controller

            name="email"
            control={control}
            rules={{ required: "email adress is required" }}
            render={( { onChange, onBlur, value } ) =>
            {
                return <TextField hideUnderline
                    error={errors.email ? errors.email.message : ''}
                    maxLength={36}
                    type="email"
                    onChangeText={( e: any ) => onChange( e )}
                    onBlur={() =>
                    {
                        onBlur();
                        clearErrors( 'email' );
                    }}
                    value={value}
                    style={[GS.input, { width: "90%", backgroundColor: Colors.foreground }]}
                    title="Email"

                />
            }}
        />
        <TouchableOpacity
            onPress={( e: any ) =>
            {
                return handleSubmit( handlePress )();
            }}
            center
            activeOpacity={.85}
            style={[{
                width: '90%',
                padding: 10,
                borderRadius: 6,
                marginTop: 10,
                overflow: "hidden",
                elevation: 10,
                borderWidth: 0.6,
                backgroundColor: Colors.foreground,
                borderColor: Colors.foreground
            }]}>
            <BackDropV3 />
            <Text btn>Send Email</Text>
        </TouchableOpacity>
    </View>
}

const ResetPassword = () =>
{
    const { handleSubmit, errors, control, clearErrors } = useForm();

    const [index, setIndex] = useState( 0 )
    const tv = useRef<any>()

    return (
        <ScrollView contentContainerStyle={{
            backgroundColor: Colors.background,
            minHeight: "100%",
        }}>

            <Transitioning.View ref={tv} transition={transitions} style={{
                padding: 10,
            }}>
                {index == 0 && <SendEmail reference={tv} setIndex={setIndex} />}
                {index == 1 && <EnterPassword reference={tv} setIndex={setIndex} />}
                {/* {index == 1 && <SendEmail />} */}

            </Transitioning.View>
        </ScrollView>
    )
}

export default ResetPassword
