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
                backgroundColor: getColorForType(type, true),
                borderWidth: 3,
                borderColor: Colors.foreground,
                borderRadius: 45,
                paddingHorizontal: 20,
                elevation: .5,
                zIndex: 5,
                padding: 3
                // , width: "100%"
            }}>

            <Text lvl2 style={{color: getColorForType(type), fontWeight:"700"}}>{GetPartytypeString( type )}</Text>

        </View>


    );
};

export default PartyTypeBadge;
