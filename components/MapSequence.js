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
      newHolds[i][3] = standardBackground;
      newHolds[i][4] = standardBorder;
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
        //dist[i] = new Array(2);
        //dist[i][0] = Math.abs(holds[i][0] - g.x);
        //dist[i][1] = Math.abs(holds[i][1] - g.y);
        dist[i] = Math.abs(holds[i][0] - g.x) + Math.abs(holds[i][1] - g.y)
        //newHolds[i][3] = standardBackground;
        //newHolds[i][4] = standardBorder;
      }
      console.log(dist);
      const min = Math.min(...dist);
      const selected = dist.indexOf(min);
      console.log(selected);

      
      newHolds[selected][3] = selectedBackground;
      newHolds[selected][4] = selectedBorder;
      setHolds(newHolds);



    });

  // ******************************************* //
  // MAP HOLDS ARRAY TO RENDERABLE ANIMATED.VIEW //
  
  const renderHolds = holds.map((hold, i) => {
    return(
      <Animated.View key={i} style={[styles.circleShape, 
        { 
          position: 'absolute',
          left: hold[0] - (hold[2] / 2),
          top: hold[1] - (hold[2] / 2),
          width: hold[2],
          height: hold[2],
          borderRadius: (hold[2] / 2),
          backgroundColor: hold[3],
          borderColor: hold[4],
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
