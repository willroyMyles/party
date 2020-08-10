import React from 'react'
import { View, Text, TextField, Button, TouchableOpacity } from 'react-native-ui-lib'
import { useForm, Controller } from 'react-hook-form';
import { GS } from '../../universal/GS';

const ResetPassword = () =>
{
    const { handleSubmit, errors, control, clearErrors } = useForm();

    const handlePress = () =>
    {
        
    }

    return (
        <View flex   br50
                marginT-90
                padding-10
                bg-white
            style={{ width: '100%', elevation: 0 }}>
            <Controller
            
                name="email"
                control={control}
                render={( { onChange, onBlur, value } ) =>
                {
                    return <TextField hideUnderline
                                    error={errors.email ? errors.email.message : ''}
                                    maxLength={36}
                                    onChangeText={( e: any ) => onChange( e )}
                                    onBlur={() =>
                                    {
                                        onBlur();
                                        clearErrors( 'email' );
                                    }}
                                    value={value}
                                    floatOnFocus
                                    floatingPlaceholder
                                    style={GS.input}
                                    floatingPlaceholderStyle={GS.floater}
                                    placeholder="email" />
                }}
            />
                <TouchableOpacity
                    onPress={( e: any ) =>
                    {
                        return handleSubmit( handlePress )();
                    }}
                    center
                    style={[GS.button, { elevation: 10 }]}>
                    <Text>Login</Text>
                </TouchableOpacity>
        </View>
    )
}

export default ResetPassword
