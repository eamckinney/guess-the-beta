import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles.js';
import Svg, { Polyline } from 'react-native-svg';

export default function MapSequence({ route }) {
  
  const [holds, setHolds] = useState(route.params.holds);
  const [image, setImage] = useState(route.params.image);

  const examplePath = [
    { x: 0, y: 0 },
  ];

  const [path, setPath] = useState(examplePath);
  const [paths, setPaths] = useState([examplePath]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {

  }, []);

  // ******************************* //
  // PAN TO CREATE PATHS IN BETWEEN HOLDS //

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      setPath([]);
    })
    .onUpdate((e) => {
      setPath([...path, {x: (e.x), y: (e.y)} ]);
    })
    .onEnd((e) => {
      setPath([...path, {x: (e.x), y: (e.y)} ]);
      setPaths([...paths, path]);
      console.log(paths.length);
    });

  const InProcessPath = () => {
    const points = (path) ? path.map(p => `${p.x},${p.y}`).join(' ') : '' ;
    return (
      <Polyline
        points={points}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
    );
  };

  const GesturePaths = paths.map((path, i) => {
    const points = (path) ? path.map(p => `${p.x},${p.y}`).join(' ') : '' ;
    return (
      <Polyline
        key={i}
        points={points}
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
    );
  });



  // ******************************* //
  // UNDO BUTTON TO REMOVE LAST PATH //

  const undo = () => {
    setPaths((current) =>
      current.slice(0,-1)
    );
    setPath([]);
  }


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
      <GestureDetector gesture={pan} style={{ flex: 1 }}>
      
        <View style={{ height: windowHeight*.77, width: windowWidth, alignItems: 'center' }}>

          <View>
            { image && <Image source={{uri:image}} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]} /> } 
            { renderHolds }  
          </View>

          <Svg height="100%" width="100%" viewBox={`0 0 ${windowWidth} ${windowHeight*.77}`} style={{position: "absolute" ,top: 0, zIndex: 1}}>
            <InProcessPath />
            { GesturePaths }
          </Svg>

        </View>

      </GestureDetector>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={ () => undo() }
          style={ [styles.buttonStyle, { backgroundColor: "#203B44"}]}
          >
          <Text style={styles.buttonText}>Undo</Text>
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
