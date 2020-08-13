import React from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import { PartyType } from '../universal/Models';
import { GetPartytypeString } from '../universal/GS';
import { useTheme } from 'styled-components';

const PartyTypeBadge = ( { type }: { type: PartyType } ) =>
{
    const theme = useTheme()
    return (
        <View
            center
            style={{
                marginTop: 4,
                backgroundColor: Colors.background,
                borderWidth: 3,
                borderColor: Colors.foreground,
                borderRadius: 45,
                paddingHorizontal: 20,
                elevation: 1,
                zIndex: 5,
                padding: 3
                // , width: "100%"
            }}>

            <Text lvl2 primary>{GetPartytypeString( type )}</Text>

        </View>


    );
};

export default PartyTypeBadge;
