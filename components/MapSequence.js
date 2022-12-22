import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles.js';


export default function MapSequence({ route }) {
  
  const [holds, setHolds] = useState(route.params.holds);
  const [image, setImage] = useState(route.params.image);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {

  }, []);

  // ******************************************* //
  // MAP HOLDS ARRAY TO RENDERABLE ANIMATED.VIEW //
  
  const renderHolds = holds.map((hold, i) => {
    return(
      <Animated.View key={i} style={[styles.circleShape, 
        { 
          position: 'absolute',
          left: hold.x - (hold.radius / 2),
          top: hold.y - (hold.radius / 2),
          width: hold.radius,
          height: hold.radius,
          borderRadius: (hold.radius / 2),
          backgroundColor: hold.backgroundColor,
          borderColor: hold.borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
        <Text>{hold.start}</Text>
      </Animated.View>
      
    );
  });
  
  return (
    <GestureHandlerRootView style={styles.screen}>
      <Text style={styles.bodyText}>Now, draw lines between holds to create your beta.</Text>
      <StatusBar hidden={true} />

      
        <Animated.View style={{ height: windowHeight*.77, width: windowWidth, alignItems: 'center', }}>
          { image && <Image source={{uri:image}} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]} /> } 
          { renderHolds }
        </Animated.View>
      

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          //onPress={ () => reset() }
          style={ [styles.buttonStyle, { backgroundColor: "#203B44"}]}
          >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity> 
        <TouchableOpacity 
          //onPress={ null }
          style={ [styles.buttonStyle, { backgroundColor: "#E76F51"}] }
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> 
      </View>
    </GestureHandlerRootView>
  );
  
}
