import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/register'
import Homepage from './src/screens/Homepage';
import Splashscreen from './src/screens/Splashscreen';
import account from './src/screens/Account';
import recomended from './src/screens/recomended';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootHome = () =>{
  return(
    <Tab.Navigator
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: '#f2ed46',
      headerShown: false,
      tabBarStyle: {
        backgroundColor:'#000',
      },

    }}
    >
<Tab.Screen
 name="home"
 component={Homepage}
 options={{
  tabBarLabel:'home',
  tabBarIcon:({color,size})=>(
    <Icon name="home" color={color} size={size} />
  ),
 }}
 />
 <Tab.Screen
 name="recomended"
 component={recomended}
 options={{
  tabBarLabel:'recomended',
  tabBarIcon:({color,size})=>(
    <Icon name=  "heart" color={color} size={size}/>
  ),
 }}
 />
 <Tab.Screen
 name="account"
 component={account}
 options={{
  tabBarLabel:'account',
  tabBarIcon:({color,size})=>(
    <Icon name=  "account" color={color} size={size} />
  ),
 }}
 />
 </Tab.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Splashscreen'component={Splashscreen} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
          <Stack.Screen name='Homepage' component={RootHome} />
        </Stack.Navigator>
    </NavigationContainer>
   
  )
}

export default App