import { BottomTabBarOptions, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react';
import { useSelector } from '../reducers';
import { Home } from '../screens/home';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StatusBar, Text } from 'react-native';

export type rootStackParamList = {
};

const Tab = createBottomTabNavigator<rootStackParamList>()

const index = (): JSX.Element => {
    const tabBarIcon =
        (name: string) =>
            ({
                focused,
                color,
                size,
            }: {
                focused: boolean;
                color: string; // Defines fab icon color
                size: number;
            }) =>
                <Icon name={name} size={20} color={focused ? 'white' : 'black'} />;
    return (
        <>
            <StatusBar
                animated
                translucent
                backgroundColor={"transparent"}
                barStyle={"dark-content"} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#8b80f6',
                    tabBarActiveBackgroundColor: '#fff',
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: tabBarIcon('home'),
                    }}
                    name="Home"
                    component={Home}
                />
                <Tab.Screen
                    name="2"
                    options={{ tabBarIcon: tabBarIcon('home') }}
                    component={Home}
                />
                <Tab.Screen
                    options={{ tabBarIcon: tabBarIcon('home') }}
                    name="3"
                    component={Home}
                />
                <Tab.Screen
                    options={{ tabBarIcon: tabBarIcon('home') }}
                    name="4"
                    component={Home}
                />
            </Tab.Navigator>
        </>
    )
}
export default index

