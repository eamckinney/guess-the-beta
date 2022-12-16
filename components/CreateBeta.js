import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector, GestureHandlerRootView, PinchGestureHandler } from "react-native-gesture-handler";
import { styles } from '../styles.js';

export default function CreateBeta() {
  const [image, setImage] = useState(null);

  
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const backToChallenges = () => navigation.navigate('Challenges')
  const modifyHolds = () => navigation.navigate('Modify Holds', {canvas: canvas, holds: holds, image: image});

  const [holds, setHolds] = useState([]);
  const [circleRadius, setCircleRadius] = useState(30);

  let scaleVal  = new Animated.Value(1)
  

  const tap = Gesture.Tap()
    .maxDistance(5)
    .onStart((g) => {
      addHold(g.x, g.y, 30);
    });

  const addHold = (x, y, r) => {

    setHolds([...holds, [x,y,r]]);
    setCircleRadius(30);
    console.log(`circle added at ${x} and ${y}`);
    console.log("holds.length: " + holds.length);

  }

  const undo = () => {

    console.log("hold to remove: " + holds[holds.length-1][0], holds[holds.length-1][1]);
    setHolds((current) =>
      current.slice(0,-1)
    );

    console.log("undo holds.length: " + holds.length);
  } 

  const handleGesture = Animated.event([{nativeEvent: {scale:scaleVal}}], { useNativeDriver: true });

  const _onGestureStateChange = (event) => {
    console.log("event.nativeEvent", event.nativeEvent);
    scaleVal.setValue(event.nativeEvent.scale);
    if (event.nativeEvent.scale != 1) {

      let newHolds = [...holds];
      newHolds[(newHolds.length-1)][2] = circleRadius * scaleVal._value;
      setHolds(newHolds);

      setCircleRadius((current) => {
        return current*scaleVal._value;
      });
    }
  }

  const gestures = Gesture.Simultaneous(tap); //, pinch

  useEffect(() => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing:true
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    pickImage();
    //navigation.navigate('Challenges');
    console.log('image loaded!');

  }, []);



  
  const renderHolds = holds.map((hold, i) => {
    if (i < holds.length-1) {
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
    } else {
      return(
        <Animated.View key={i} style={[styles.circleShape, 
          { 
            position: 'absolute',
            left: hold[0] - (hold[2] / 2),
            top: hold[1] - (hold[2] / 2),
            width: hold[2],
            height: hold[2],
            borderRadius: (hold[2] / 2),
            transform:[
              { perspective: 200 },
              { scale :  scaleVal }
            ]
          },
          
        ]}/>
      );
    }
    

  });

  return (
    <GestureHandlerRootView style={styles.screen}>
      <Text style={styles.subHead}>Select your holds.</Text>
      <StatusBar hidden={true} />
      
      <GestureDetector gesture={gestures} style={{ flex: 1 }}>
       <PinchGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={_onGestureStateChange}>
          <Animated.View style={{ height: windowHeight*.77, width: windowWidth }}>

            { image && <Image source={{uri:image}} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]} /> }          
            { renderHolds }

          </Animated.View>

        </PinchGestureHandler>
      </GestureDetector>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={ () => undo() }
          style={ [styles.buttonStyle, { backgroundColor: "#203B44"}]}
          >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity> 
        <TouchableOpacity 
          onPress={ () => modifyHolds() }
          style={ [styles.buttonStyle, { backgroundColor: "#E76F51"}]}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> 
      </View>
    </GestureHandlerRootView>
  );
  
}

//<Canvas ref={canvas} style={styles.canvas} />

//<StatusBar style="auto" />

// REACT-NATIVE-CANVAS: https://www.atomlab.dev/tutorials/react-native-canvas

// RE-SIZE & MOVE CIRCLES? https://blog.bitsrc.io/using-the-gesture-handler-in-react-native-c07f84ddfa49
// USE PINCH: https://docs.swmansion.com/react-native-gesture-handler/docs/2.0.0/api/gestures/pinch-gesture/

// CALLBACK?? https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780

// https://medium.com/react-native-rocket/building-a-hand-drawing-app-with-react-native-skia-and-gesture-handler-9797f5f7b9b4
// https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/tap-gesture

// CSS Organization Method🤓 - https://freecontent.manning.com/applying-and-organizing-styles-in-react-native/

