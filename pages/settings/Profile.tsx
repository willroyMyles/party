import React, { useEffect, useState } from 'react'
import { View, Text, Avatar, Switch, TouchableOpacity, Colors } from 'react-native-ui-lib'
import ProfilePiece from '../../pieces/ProfilePiece'
import tm, { ThemeType } from '../../universal/UiManager'
import { Alert, Linking, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BackDrop, { BackDropV2 } from '../../components/BackDrop'
import RSVPModule from '../../components/RSVPModule'
import { ScrollView } from 'react-native-gesture-handler'
import FireStore from '../../data_layer/FireStore'
import { GetLocationPermission } from '../../universal/GetLocation'
import { observer } from 'mobx-react'
import FBS from '../../data_layer/FireBaseClient'
import auth from '@react-native-firebase/auth';
import LoaderButton from '../../components/LoaderButton'

const Profile = () =>
{

    const theme = useTheme()
    const navigation = useNavigation()
    const [darkTheme, setdarkTheme] = useState( false )
    const [loading, setLoading] = useState(false)

    const handleCreateEvent = () =>
    {        
        setLoading(true)
        FireStore.auth.needAuth().then( res =>
        {
            if ( res ){
                FireStore.retrieve.limit().then(res=>{
                    if(res)   {
                        navigation.navigate( "create event" )
                    }
                    setLoading(false)
                })
            }else{
                setLoading(false)
            }

         
        } )
    }
    const handleCHnage = ( val: boolean ) =>
    {
        setdarkTheme( val )
        setTimeout(() => {
                tm.setThemeType( val )
        }, 10);
    }

    const handleLocationChanged = ( val: boolean ) =>
    {                
        if ( val )
        {
            GetLocationPermission().then( (res) =>
            {
                tm.setLocationGranted( res )

            })
        } else
        {
            tm.setLocationGranted(val)
        }
    }

    const checButton = () =>
    {
       
        FireStore.send.moveDataAround()
    }
    useEffect( () =>
        setdarkTheme( tm.themeType == ThemeType.DARK )
        , [] )

    return (
        <ScrollView contentContainerStyle={{ minHeight: "100%", overflow: "scroll", padding: 10, backgroundColor: Colors.background }}>
            <ProfilePiece />
            <View>
                <View row spread>
                    <Text lvl2>Dark Theme</Text>
                    <Switch
                        offColor={Colors.secondary}
                        onColor={Colors.secondary}
                        value={darkTheme}
                        thumbColor={Colors.background}
                        thumbStyle={{ backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.primary + "60" }}
                        style={{ borderWidth: 1, borderColor: Colors.primary + "68", elevation: 1 }}

                        onValueChange={handleCHnage}></Switch>
                </View>
                <View marginT-20 row spread>
                    <Text lvl2>Location Permission</Text>
                    <Switch
                        offColor={Colors.secondary}
                        onColor={Colors.secondary}
                        value={tm.isLocationGranted}
                        thumbColor={Colors.background}
                        thumbStyle={{ backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.primary + "60" }}
                        style={{ borderWidth: 1, borderColor: Colors.primary + "68", elevation: 1 }}

                        onValueChange={handleLocationChanged}
                    ></Switch>
                </View>
                {tm.isLocationGranted && <View marginT-20 row spread>
                    <Text lvl2>Location All the time</Text>
                    <TouchableOpacity onPress={() =>
                    {
                        Alert.alert( "Additional Location Permission Needed", `     \tHey, we need additional persmission location to be "allow all the time" to determine when your at a party. this will check if your at a party periodically. No personal information will be collected in the process`,
                            [{
                                text: "Maybe Later",
                                onPress: () => { },
                                style: "cancel"
                            },
                            {
                                text: "Sure",
                                onPress: () => Linking.openSettings()
                            },
                       
                            ], {cancelable:true} );
                    }} center style={{
                        backgroundColor: Colors.foreground,
                        paddingHorizontal: 12,
                        padding:6,
                        borderRadius: 5,
                        elevation:10
                    }}>
                        {/* <Icon name="info" size={22} color={Colors.text1} /> */}
                        <Text lvl1> show</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            <View>
                <RSVPModule />
            </View>
            <View center marginT-40>

                <LoaderButton loading={loading} onPress={handleCreateEvent} title={
                    <View row>
                        <Icon name="plus" size={18} color={Colors.text1} />
                        <Text btn uppercase marginH-10 >create party</Text>
                    </View >
                } />

            </View>

            { auth().currentUser?.email == 'myleswillroy@gmail.com' &&   <View center marginT-40>
                    <TouchableOpacity row onPress={checButton} activeOpacity={.8} center style={[style.create, { backgroundColor: Colors.foreground }]}>
                        <Text btn uppercase marginH-10 >check backend</Text>
                        <BackDropV2 />
                    </TouchableOpacity>
                </View>
           }
        </ScrollView>
    )


}

export default observer(Profile)

const style = StyleSheet.create( {
    create: {
        padding: 20,
        // borderWidth: .1,
        // borderColor: Colors.red80,
        borderRadius: 7,
        width: "100%",
        elevation: 10,
        minHeight: 160,
        overflow: "hidden"


    }
} )
