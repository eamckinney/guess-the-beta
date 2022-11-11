import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BetaScreen from "./components/BetaScreen";
import HomeScreen from "./components/HomeScreen";


export default function App() {
	const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer>
			<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Beta') {
              return (
                <Ionicons
                  name={focused ? 'ios-list' : 'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
      >
				
        
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          
        />

				<Tab.Screen
					name="Beta"
					component={BetaScreen}
					options={{
						title: "Betas",
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

//export default App;
