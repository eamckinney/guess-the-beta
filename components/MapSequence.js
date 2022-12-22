import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles.js';


export default function MapSequence({ route }) {
  
  const [holds, setHolds] = useState(route.params.holds);
  const [image, setImage] = useState(route.params.image);

  const standardBackground = 'rgba(231, 111, 81, 0.2)';
  const standardBorder = 'rgba(231, 111, 81, 1.0)';

  const selectedBackground = 'rgba(255, 255, 255, 0.2)';
  const selectedBorder = 'rgba(255, 255, 255, 1.0)';

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    let newHolds = [...holds];
    for (let i = 0; i < holds.length; i++) {
      newHolds[i].backgroundColor = standardBackground;
      newHolds[i].borderColor = standardBorder;
    }
    setHolds(newHolds);


  }, []);

  // ******************* //
  // TAP TO SELECT HOLDS //

  const tap = Gesture.Tap()
    .maxDistance(5)
    .onStart((g) => {
      let dist = new Array(holds.length);
      let newHolds = [...holds];

      for (let i = 0; i < holds.length; i++) {
        dist[i] = Math.abs(holds[i].x - g.x) + Math.abs(holds[i].y - g.y)
      }
      
      const min = Math.min(...dist);
      const selected = dist.indexOf(min);
      
      newHolds[selected].backgroundColor = selectedBackground;
      newHolds[selected].borderColor = selectedBorder;
      setHolds(newHolds);



    });

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
        },
      ]}/>
    );
  });
  
  return (
    <GestureHandlerRootView style={styles.screen}>
      <Text style={styles.bodyText}>Next, select your starting hands and feet by tapping the holds.</Text>
      <StatusBar hidden={true} />

      <GestureDetector gesture={tap} style={{ flex: 1 }}>
        <Animated.View style={{ height: windowHeight*.77, width: windowWidth }}>
          { image && <Image source={{uri:image}} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]} /> }          
          { renderHolds }
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonRow}>
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
