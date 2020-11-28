import React, { useState } from 'react';
import {
View,
Text,
TextField,
TouchableOpacity,
Image,
Colors,
} from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import FireStore from '../../data_layer/FireStore';
import { HandleFirebaseErrors } from '../../universal/EventEmitter';
import { useNavigation } from '@react-navigation/native';
import TToast from '../../components/TToast';
import SkipButton from '../../components/SkipButton';
import { useTheme } from 'styled-components';
import BackDrop, { BackDropV2 } from '../../components/BackDrop';
import { GS } from '../../universal/GS';
import crashlytics from '@react-native-firebase/crashlytics';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup'; // for everything
import CustomTextInput from '../../components/CustomTextInput';

const Login = () => {
    const navigation = useNavigation();
    const [error, setError] = useState<string>("")

    const schema = yup.object().shape({
        email: yup.string().required("i need you rbo").email().min(3),
        password: yup.string().required().min(3)
    })

    const onSubmit = async (data: { email: string; password: string }) => {


        schema.isValid(data, {
            abortEarly: true
        }).then(res => {
            if(res){
                crashlytics().log("on submit login run")
                TToast.working("Loggin in", "Wait a moment while we log you in...")
                FireStore.login(data.email, data.password)
                    .then(() => {
                        TToast.success("Ready!", "Logged in successfully ")
                        goHome()
                    })
                    .catch((err) => HandleFirebaseErrors(err.code));
            }
        }).catch(errors => {
            console.log(errors);

        })


        return

       
    };

    const handleRegisterPressed = () => navigation.navigate('register');
    const handleResetPressed = () => navigation.navigate("reset password")

    const handleGoogleLogin = () => FireStore.auth.google().then(res => {
        if (res) {
            crashlytics().log(`google sign in completed ${res}`)
            goHome()
        } else {
            crashlytics().log(`google sign in didnt work ${res}`)
            TToast.error("didnt log in ", "We had a problem logging you in" )
            setError(`${res}`)
           
        }

    }).catch(err=>{
        TToast.error("didnt log in ", "We had a problem logging you in" )
        crashlytics().log(`google sign in didnt work ${err}`)
        setError(`${err}`)
        
    })


    const goHome = () => {
        TToast.success('Great!', 'Your all good to go!');
        navigation.navigate('home');
    }

    const props = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => onSubmit(values)
        , validationSchema: schema,
        validateOnChange:false
    })
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
                <View marginT-10 padding-10 centerV>
                    <Formik 
                        initialValues={props.initialValues}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        {() => (
                            <View>
                                <CustomTextInput 
                                    name="email" 
                                    errors={props.errors.email}
                                    onChangeText={props.handleChange("email")}
                                    onBlur={props.handleBlur("email")}
                                    value={props.values.email}
                                    style={[GS.input, { backgroundColor: Colors.background,  width:"100%" }]}
                                />
                                   <CustomTextInput 
                                    name="password" 
                                    secureTextEntry={true}
                                    errors={props.errors.password}
                                    onChangeText={props.handleChange("password")}
                                    onBlur={props.handleBlur("password")}
                                    value={props.values.password}
                                    style={[GS.input, { backgroundColor: Colors.background,  width:"100%" }]}
                                />
                            </View>

                        )}
                    </Formik>



                
                    <TouchableOpacity onPress={handleResetPressed} right marginT-8>
                        <Text muted>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View marginT-20 style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={() => {
                        crashlytics().log("login pressed")
                        return props.handleSubmit()
                    }}
                    center
                    bg-background
                    style={[style.btn, { borderColor: Colors.foreground }]}>
                    <Text btn>Login</Text>
                    <BackDrop />
                </TouchableOpacity>
                <TouchableOpacity bg-background row center padding-10 onPress={handleGoogleLogin} style={[style.btn, { borderColor: Colors.foreground }]}>
                    <Image source={require("../../assets/icons/google.png")} style={{ width: 20, height: 20 }} />
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
            <Text>{error}</Text>
        </ScrollView>
    );
};

export default Login;
export const style = StyleSheet.create({
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
});
