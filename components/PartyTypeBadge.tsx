import React from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import { PartyType } from '../universal/Models';
import { getColorForType, GetPartytypeString } from '../universal/GS';
import { useTheme } from 'styled-components';

const PartyTypeBadge = ( { type }: { type: PartyType } ) =>
{
    const theme = useTheme()
    return (
        <View
            center
            style={{
                marginTop: 4,
                backgroundColor: getColorForType(type),
                borderWidth: 3,
                borderColor: Colors.foreground,
                borderRadius: 45,
                paddingHorizontal: 20,
                paddingVertical:5,
                elevation: 4,
                zIndex: 5,
                padding: 3
                // , width: "100%"
            }}>

            <Text lvl2 style={{color: getColorForType(type, true), fontWeight:"700"}}>{GetPartytypeString( type )}</Text>

        </View>


    );
};

export default PartyTypeBadge;
