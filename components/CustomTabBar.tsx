import React from 'react'
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib';
import { NavigationState, useNavigation, NavigationContext, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

function CustomTabBar( { state, descriptors, navigation }: { state: NavigationState, descriptors: any, navigation: NavigationProp<any> } )
{

  const theme = useTheme()
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if ( focusedOptions.tabBarVisible === false )
  {
    return null;
  }




  return (
    <View bg-background style={{ flexDirection: 'row', borderTopWidth: 3, borderColor: Colors.foreground }}>
      {state.routes.map( ( route: any, index: number ) =>
      {
        const { tabBarIcon } = descriptors[route.key].options

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const color = isFocused ? Colors.primary : Colors.muted + "55"

        const onPress = () =>
        {
            // const event = navigation.dispatch({
            //   type: 'tabPress',
            //   target: route.key,
            // });

          console.log(route.name);
          

          
            navigation.navigate( route.name );
          
        };

        const onLongPress = () =>
        {
          //   navigation.emit({
          //     type: 'tabLongPress',
          //     target: route.key,
          //   });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            center
            style={{
              flex: 1,
              paddingVertical: 10,

            }}
          >
            {tabBarIcon && <Icon name={tabBarIcon()} size={20} color={color} />}
            <Text marginT-4 lvl3 adjustsFontSizeToFit allowFontScaling style={{ color, textTransform: "uppercase" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      } )}
    </View>
  );
}

// ...
export default CustomTabBar
