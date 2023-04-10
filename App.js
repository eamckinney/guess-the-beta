import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "./components/HomeScreen";
import CreateBeta from "./components/CreateBeta";
import StartingHolds from "./components/StartingHolds";
import MapSequence from "./components/MapSequence";
import RunBeta from "./components/RunBeta"; 
import ExploreScreen from "./components/ExploreScreen";


export default function App() {
  const Tab = createBottomTabNavigator();
  const BetaStack = createStackNavigator();

  useEffect(() => {
    //AsyncStorage.clear();
	}, []);

  function BetaStackScreen() {
    return (
      <BetaStack.Navigator 
        screenOptions={{
          headerShown: false
        }}>
        <BetaStack.Screen
          name="Create Beta"
          component={CreateBeta}
        />
        <BetaStack.Screen
          name="Starting Holds"
          component={StartingHolds}
        />
        <BetaStack.Screen
          name="Map Sequence"
          component={MapSequence}
        />
        <BetaStack.Screen
          name="Run Beta"
          component={RunBeta}
        />
      </BetaStack.Navigator>
    );
  }

	return (
		<NavigationContainer>
			<Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Challenges') {
              return (
                <Ionicons
                  name={focused ? 'flame' : 'flame'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Explore') {
              return (
                <Ionicons
                  name={focused ? 'rocket' : 'rocket'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Create Beta') {
              return (
                <Ionicons
                  name={focused ? 'add-circle' : 'add'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          //tabBarInactiveTintColor: 'gray',
          //tabBarActiveTintColor: 'tomato',
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: {
            borderTopColor: '#66666666',
            backgroundColor: '#000',
            elevation: 0,
          },
        }}
      >
				
        
        <Tab.Screen 
          name="Challenges" 
          component={HomeScreen} 
        />
        <Tab.Screen 
          name="Create Beta" 
          component={BetaStackScreen} 
        />
				<Tab.Screen
					name="Explore"
					component={ExploreScreen}
					options={{
						title: "Explore",
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
