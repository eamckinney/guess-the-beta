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
  // PAN TO ADJUST POSITION OF HOLDS //

  //let positionX = new Animated.Value(0);
  //let positionY = new Animated.Value(0);

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      setPath([]);
    })
    .onUpdate((e) => {
      //positionX.setValue(e.translationX);
      //positionY.setValue(e.translationY);

      setPath([...path, {x: (e.x), y: (e.y)} ]);
      
    })
    .onEnd((e) => {
      //positionX.setValue(e.translationX);
      //positionY.setValue(e.translationY);

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

        
         
          <Animated.View style={{ height: windowHeight*.77, width: windowWidth, alignItems: 'center', zIndex: -1  }}>
            { image && <Image source={{uri:image}} style={[styles.betaImage, { height: windowHeight, width: windowWidth, zIndex: -1 }]} /> } 
            { renderHolds }
            <Svg height="100%" width="100%" viewBox={`0 0 ${windowWidth} ${windowHeight*.77}`}>
              <InProcessPath />
              { GesturePaths }
            </Svg>
          </Animated.View>

        
      </GestureDetector>
      

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
