import React from 'react';
import
{
    View,
    Text,
    TextField,
    TouchableOpacity,
    Button,
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import FireStore from '../../data_layer/FireStore';
import { HandleFirebaseErrors } from '../../universal/EventEmitter';
import { useNavigation } from '@react-navigation/native';
import TToast from '../../components/TToast';
import SkipButton from '../../components/SkipButton';

const Login = () =>
{
    const { handleSubmit, errors, control, clearErrors } = useForm();
    const navigation = useNavigation();

    const onSubmit = ( data: { email: string; password: string } ) =>
    {
        FireStore.login( data.email, data.password )
            .then( ( res ) =>
            {
                console.log( 'log in success' );
                goHome()
            } )
            .catch( ( err ) => HandleFirebaseErrors( err.code ) );
    };

    const handleRegisterPressed = () => navigation.navigate( 'register' );

    const handleGoogleLogin = () => FireStore.auth.google().then( res =>
    {
        if ( res )
        {
            goHome()
        } else
        {
            
        }
    } )

    // const handleFaceBookLogin = () => FireStore.auth.facebook().then( res =>
    // {
    //     if ( res )
    //     {
    //         goHome()
    //     } else
    //     {
            
    //     }
    // } )
    
    const goHome = () =>
    {
        TToast.success( 'Great!', 'Your all good to go!' );
                navigation.navigate( 'home' );
    }

    return (
        <ScrollView
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}>
            <Text>Welcome</Text>
            <View
                br50
                marginT-90
                padding-10
                bg-white
                style={{ width: '100%', elevation: 0 }}>
                <View marginT-10 padding-10 centerV style={{}}>
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
                                    onChangeText={( e: any ) => onChange( e )}
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
                    <TouchableOpacity right marginT-8>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View marginT-20 style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={( e: any ) =>
                    {
                        return handleSubmit( onSubmit )();
                    }}
                    center
                    style={[style.btn, { elevation: 10 }]}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGoogleLogin} center style={[style.btn]}>
                    <Text>Continue with Google</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleFaceBookLogin} center style={[style.btn]}>
                    <Text>Continue with Facebook</Text>
                </TouchableOpacity> */}
            </View>
            <View marginT-30 row center>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={handleRegisterPressed}>
                    <Text> Register</Text>
                </TouchableOpacity>
            </View>
            <SkipButton where="home" />
        </ScrollView>
    );
};

export default Login;
export const style = StyleSheet.create( {
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
