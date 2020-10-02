import React from 'react';
import
{
    View,
    Text,
    TextField,
    TouchableOpacity,
    Button,
    Image,
    ColorName,
    Colors,
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import FireStore from '../../data_layer/FireStore';
import { HandleFirebaseErrors } from '../../universal/EventEmitter';
import { useNavigation } from '@react-navigation/native';
import TToast from '../../components/TToast';
import SkipButton from '../../components/SkipButton';
import { useTheme } from 'styled-components';
import BackDrop, { BackDropV3, BackDropV2 } from '../../components/BackDrop';
import { GS } from '../../universal/GS';

const Login = () =>
{
    const { handleSubmit, errors, control, clearErrors } = useForm();
    const navigation = useNavigation();
    const theme = useTheme()

    const onSubmit = ( data: { email: string; password: string } ) =>
    {
        TToast.working( "Loggin in", "Wait a moment while we log you in..." )
        FireStore.login( data.email, data.password )
            .then( ( res ) =>
            {
                TToast.success( "Ready!", "Logged in successfully " )
                goHome()
            } )
            .catch( ( err ) => HandleFirebaseErrors( err.code ) );
    };

    const handleRegisterPressed = () => navigation.navigate( 'register' );
    const handleResetPressed = () => navigation.navigate( "reset password" )

    const handleGoogleLogin = () => FireStore.auth.google().then( res =>
    {
        if ( res )
        {
            goHome()
        } else
        {

        }
    } )


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
                minHeight: "100%",
                backgroundColor: Colors.background
            }}>
            <Text welcome>Welcome Back</Text>
            <BackDropV2 />
            <View
                br50
                marginT-90
                padding-10
                bg-foreground
                style={{ width: '100%', elevation: 0 }}>
                <View marginT-10 padding-10 centerV style={{}}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'email required' }}
                        defaultValue=""
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
                                    title="Email"
                                    style={[GS.input, { backgroundColor: Colors.background }]}

                                />
                            );
                        }}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'password required' }}
                        defaultValue=""
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

                                    style={[GS.input, { backgroundColor: Colors.background }]}
                                    title="Password"
                                />
                            );
                        }}
                    />
                    <TouchableOpacity onPress={handleResetPressed} right marginT-8>
                        <Text muted>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View marginT-20 style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={( e: any ) =>
                    {
                        //return handleSubmit( onSubmit )();
                    }}
                    center
                    bg-background
                    style={[style.btn, { borderColor: Colors.foreground }]}>
                    <Text btn>Login</Text>
                    <BackDrop />
                </TouchableOpacity>
                <TouchableOpacity bg-background row center padding-10 onPress={handleGoogleLogin} style={[style.btn, { borderColor: Colors.foreground }]}>
                    <Image source={require( "../../assets/icons/google.png" )} style={{ width: 20, height: 20 }} />
                    <Text marginL-8 btn>Continue with Google</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleFaceBookLogin} center style={[style.btn]}>
                    <Text>Continue with Facebook</Text>
                </TouchableOpacity> */}
            </View>
            <View marginT-30 row center>
                <Text muted>Don't have an account?</Text>
                <TouchableOpacity onPress={handleRegisterPressed}>
                    <Text btn primary> Register</Text>
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
        elevation: 5,
        borderWidth: 0.6
    },
} );
