import React from 'react';
import { View, Text, TextField, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import FireStore from '../../data_layer/FireStore';
import { HandleFirebaseErrors } from '../../universal/EventEmitter';
import TToast from '../../components/TToast';
import SkipButton from '../../components/SkipButton';
import BackDrop, { BackDropV2 } from '../../components/BackDrop';
import { useTheme } from 'styled-components';
import { GS } from '../../universal/GS';

const Register = () =>
{
    const { handleSubmit, errors, control, clearErrors } = useForm();
    const navigation = useNavigation();
    const theme = useTheme()
    const onSubmit = ( data: {
        username: string;
        email: string;
        password: string;
    } ) =>
    {
        TToast.working( 'Working', 'Talking with our people' );
        FireStore.register( data.username, data.email, data.password )
            .then( ( res ) =>
            {
                TToast.success( 'Great!', 'Your all good to go!' );
                navigation.navigate( 'home' );
            } )
            .catch( ( err ) => HandleFirebaseErrors( err.code ) );
    };

    const handleLoginPressed = () => navigation.navigate( 'login' );

    return (
        <ScrollView
            style={{ backgroundColor: "transparent" }}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
                minHeight: "100%",
                backgroundColor: Colors.background
            }}>
            <View style={{
                position: "absolute",
                height: "60%",
                width: "100%"
            }}>
                <BackDropV2 />
            </View>

            <Text welcome >Welcome</Text>
            <View
                br50
                marginT-90
                padding-10
                bg-foreground
                style={{ width: '100%', elevation: 3 }}>
                <View marginT-10 padding-10 centerV style={{}}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'user-name required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                    hideUnderline
                                    error={errors.username ? errors.username.message : ''}
                                    maxLength={16}
                                    onChangeText={( e: any ) => onChange( e )}
                                    onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'user-name' );
                                    }}
                                    value={value}
                                    style={[GS.input, { backgroundColor: Colors.background }]}
                                    title="user-name"
                                />
                            );
                        }}
                    />
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'email required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                    hideUnderline
                                    error={errors.email ? errors.email.message : ''}
                                    maxLength={56}
                                    onChangeText={( e: any ) => onChange( e )}
                                    onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'email' );
                                    }}
                                    value={value}
                                    style={[GS.input, { backgroundColor: Colors.background }]}
                                    title="Email"
                                />
                            );
                        }}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'password required' }}
                        render={( { onChange, onBlur, value } ) =>
                        {
                            return (
                                <TextField
                                    hideUnderline
                                    error={errors.password ? errors.password.message : ''}
                                    maxLength={16}
                                    secureTextEntry={true}
                                    onChangeText={onChange}
                                    onBlur={onBlur()}
                                    value={value}
                                    style={[GS.input, { backgroundColor: Colors.background }]}
                                    title="password"
                                />
                            );
                        }}
                    />
                </View>
            </View>
            <View marginT-20 style={{ width: '100%' }}>
                <TouchableOpacity

                    onPress={() => handleSubmit( onSubmit )()}
                    center
                    bg-background
                    style={[style.btn, { borderColor: Colors.foreground }]}>
                    <Text btn>Register</Text>
                    <BackDrop />
                </TouchableOpacity>
            </View>
            <View marginT-30 row center>
                <Text muted >Already have an account?</Text>
                <TouchableOpacity onPress={() => handleLoginPressed()}>
                    <Text btn primary> Login</Text>
                </TouchableOpacity>
            </View>
            <SkipButton where="home" />
        </ScrollView>
    );
};

export default Register;
export const style = StyleSheet.create( {
    cont: {
        padding: 10,
    },
    input: {
        marginTop: -7,
        padding: 5,
        borderRadius: 7,
        paddingStart: 12,
    },
    floater: {
        marginStart: 12,
        opacity: 0.5,
        color: 'grey',
    },
    btn: {
        width: '100%',
        padding: 10,
        borderRadius: 6,
        marginTop: 10,
        overflow: "hidden",
        elevation: 10,
        borderWidth: 0.6
    },
} );
