import React from 'react';
import { View, Text, TextField, TouchableOpacity } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import FireStore from '../../data_layer/FireStore';
import { HandleFirebaseErrors } from '../../universal/EventEmitter';
import TToast from '../../components/TToast';
import SkipButton from '../../components/SkipButton';

const Register = () =>
{
    const { handleSubmit, errors, control, clearErrors } = useForm();
    const navigation = useNavigation();
    const onSubmit = ( data: {
        username: string;
        email: string;
        password: string;
    } ) =>
    {
        console.log( data );

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
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}>
            <Text>Register</Text>
            <View
                br50
                marginT-90
                padding-10
                bg-white
                style={{ width: '100%', elevation: 0 }}>
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
                                    floatOnFocus
                                    floatingPlaceholder
                                    style={style.input}
                                    floatingPlaceholderStyle={style.floater}
                                    placeholder="user-name"
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
                                    maxLength={16}
                                    onChangeText={( e: any ) => onChange( e )}
                                    onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'email' );
                                    }}
                                    value={value}
                                    floatOnFocus
                                    floatingPlaceholder
                                    style={style.input}
                                    floatingPlaceholderStyle={style.floater}
                                    placeholder="email"
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
                                    floatOnFocus
                                    floatingPlaceholder
                                    style={style.input}
                                    floatingPlaceholderStyle={style.floater}
                                    placeholder="password"
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
                    style={[style.btn, { elevation: 10 }]}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
            <View marginT-30 row center>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => handleLoginPressed()}>
                    <Text> Login</Text>
                </TouchableOpacity>
            </View>
            <SkipButton where="home" />
        </ScrollView>
    );
};

export default Register;
const style = StyleSheet.create( {
    cont: {
        padding: 10,
    },
    input: {
        backgroundColor: 'rgba(100,100,100,.1)',
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
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 6,
        marginTop: 10,
    },
} );
