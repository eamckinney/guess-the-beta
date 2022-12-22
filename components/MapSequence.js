import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
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
          left: hold[0] - (hold[2] / 2),
          top: hold[1] - (hold[2] / 2),
          width: hold[2],
          height: hold[2],
          borderRadius: (hold[2] / 2),
        },
      ]}/>
    );
  });
  
  return (
    <View style={styles.screen}>
      <Text style={styles.bodyText}>Next, select your starting hands and feet by tapping the holds.</Text>
      
      <StatusBar hidden={true} />
      
      <Animated.View style={{ height: windowHeight*.77, width: windowWidth }}>
        { image && <Image source={{uri:image}} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]} /> }          
        { renderHolds }
      </Animated.View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          //onPress={ null }
          style={ [styles.buttonStyle, { backgroundColor: "#E76F51"}] }
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
  
}
