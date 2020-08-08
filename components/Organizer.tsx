import React from 'react'
import { View, Text, Avatar } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'

const Organizer = ({ org, name, reference }: { org: boolean, name: string, reference: string }) => {
    const theme = useTheme()
    return (
        <View row padding-10 marginT-15>
            <Avatar animate label={GetInitials(name)}  />
            <View marginL-10>
                <Text regular>{name}</Text>
                {org && <Text lvl3>organizer</Text>}
            </View>
        </View>
    )
}

const GetInitials = (name: string) => {
    var initials = name.match(/\b\w/g) || [];
    let n = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return n
}

export default Organizer
