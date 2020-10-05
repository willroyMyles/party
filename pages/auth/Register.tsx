 import React from 'react';
import { View, Text, TextField, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FireStore from '../../data_layer/FireStore';
import { HandleFirebaseErrors } from '../../universal/EventEmitter';
import TToast from '../../components/TToast';
import SkipButton from '../../components/SkipButton';
import BackDrop, { BackDropV2 } from '../../components/BackDrop';
import { useTheme } from 'styled-components';
import { GS } from '../../universal/GS';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup'; // for everything
import CustomTextInput from '../../components/CustomTextInput';


const Register = () =>
{
    const navigation = useNavigation();
    const theme = useTheme()

    const schema = yup.object().shape({
        username: yup.string().required("Your user-name is required"),
        email: yup.string().required("Your email is a must").email().min(3),
        password: yup.string().required().min(3)
    })

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
    const props = useFormik({
        initialValues: {
            email: '',
            password: '',
            username:""
        },
        onSubmit: values => onSubmit(values)
        , validationSchema: schema,
        validateOnChange:false
    })
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
                <Formik 
                        initialValues={props.initialValues}
                        onSubmit={onSubmit}
                        validationSchema={schema}
                    >
                        {() => (
                            <View>
                                <CustomTextInput 
                                    name="user-name" 
                                    errors={props.errors.username}
                                    maxLength={16}
                                    onChangeText={props.handleChange("username")}
                                    onBlur={props.handleBlur("username")}
                                    value={props.values.username}
                                    style={[GS.input, { backgroundColor: Colors.background,  width:"100%" }]}
                                /> 
                                <CustomTextInput 
                                name="email" 
                                errors={props.errors.email}
                                maxLength={16}
                                onChangeText={props.handleChange("email")}
                                onBlur={props.handleBlur("email")}
                                value={props.values.email}
                                style={[GS.input, { backgroundColor: Colors.background,  width:"100%" }]}
                            />
                                   <CustomTextInput 
                                    name="password" 
                                    secureTextEntry={true}
                                    errors={props.errors.password}
                                    maxLength={16}
                                    onChangeText={props.handleChange("password")}
                                    onBlur={props.handleBlur("password")}
                                    value={props.values.password}
                                    style={[GS.input, { backgroundColor: Colors.background,  width:"100%" }]}
                                />
                            </View>

                        )}
                    </Formik>
                </View>
            </View>
            <View marginT-20 style={{ width: '100%' }}>
                <TouchableOpacity
                    accessibilityStates={[]}
                    onPress={props.handleSubmit}
                    center
                    bg-background
                    style={[style.btn, { borderColor: Colors.foreground }]}>
                    <Text btn>Register</Text>
                    <BackDrop />
                </TouchableOpacity>
            </View>
            <View marginT-30 row center>
                <Text muted >Already have an account?</Text>
                <TouchableOpacity
                    accessibilityStates={[]}
                    onPress={() => handleLoginPressed()}>
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
