import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, Animated, ImageBackground } from 'react-native';
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

  const startingHolds = () => navigation.navigate('Starting Holds', {holds: holds, image: image});

  const [holds, setHolds] = useState([]);
  const [circleRadius, setCircleRadius] = useState(30);


  // **************** //
  // TAP TO ADD HOLDS //

  const tap = Gesture.Tap()
    .maxDistance(5)
    .onStart((g) => {
      addHold(g.x, g.y, 30);
    });

  const addHold = (x, y, r) => {

    setHolds([...holds, 
      {
        x: x, 
        y: y,
        radius: r
      }
    ]);
    setCircleRadius(30);
    console.log(`circle added at ${x} and ${y}`);
    console.log("holds.length: " + holds.length);

  }

  // ******************************* //
  // UNDO BUTTON TO REMOVE LAST HOLD //

  const undo = () => {

    console.log("hold to remove: " + holds[holds.length-1].x, holds[holds.length-1].y);
    setHolds((current) =>
      current.slice(0,-1)
    );

    console.log("undo holds.length: " + holds.length);
  }

  // ******************* //
  // PINCH TO SIZE HOLDS //

  let scaleVal  = new Animated.Value(1)
  
  const handlePinch = Animated.event([{nativeEvent: {scale:scaleVal}}], { useNativeDriver: true });

  const _onPinchStateChange = (event) => {
    scaleVal.setValue(event.nativeEvent.scale);
    if (event.nativeEvent.scale != 1) {

      console.log(event.nativeEvent);

      let newHolds = [...holds];
      newHolds[(newHolds.length-1)].radius = circleRadius * scaleVal._value;
      setHolds(newHolds);

      // sets new circleRadius so on next pinch, it doesn't start back over at 30
      setCircleRadius((current) => {
        return current*scaleVal._value;
      });

    }
  }
  
  // ******************************* //
  // PAN TO ADJUST POSITION OF HOLDS //

  let positionX = new Animated.Value(0);
  let positionY = new Animated.Value(0);

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onUpdate((e) => {
      positionX.setValue(e.translationX);
      positionY.setValue(e.translationY);
    })
    .onEnd((e) => {
      positionX.setValue(e.translationX);
      positionY.setValue(e.translationY);

      let newHolds = [...holds];
      newHolds[(newHolds.length-1)].x = holds[holds.length-1].x + e.translationX;
      newHolds[(newHolds.length-1)].y = holds[holds.length-1].y + e.translationY;
      setHolds(newHolds);
    });

  // COMBINE TAP & PAN GESTURE FOR GESTURE DETECTOR
  const gestures = Gesture.Simultaneous(tap, pan); 

  // ************************************************ //
  // useEffect TO LAUNCH IMAGE LIBRARY & CHOOSE IMAGE //

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


  // ******************************************* //
  // MAP HOLDS ARRAY TO RENDERABLE ANIMATED.VIEW //
  
  const renderHolds = holds.map((hold, i) => {
    console.log(holds);
    if (i < holds.length-1) {
      return(
        <Animated.View key={i} style={[styles.circleShape, 
          { 
            position: 'absolute',
            left: hold.x - (hold.radius / 2),
            top: hold.y - (hold.radius / 2),
            width: hold.radius,
            height: hold.radius,
            borderRadius: (hold.radius / 2),
          },
        ]}/>
      );
    } else {
      return(
        <Animated.View key={i} style={[styles.circleShape, 
          { 
            position: 'absolute',
            left: hold.x - (hold.radius / 2),
            top: hold.y - (hold.radius / 2),
            width: hold.radius,
            height: hold.radius,
            borderRadius: (hold.radius / 2),
            transform:[
              { perspective: 200 },
              { scale :  scaleVal },
              { translateX: positionX },
              { translateY: positionY }
            ]
          },
          
        ]}/>
      );
    }
    

  });

  return (
    <GestureHandlerRootView style={[styles.screen]}>
      <Text style={styles.subHead}>1 / Tap the holds on your problem.</Text>
      <StatusBar hidden={true} />
      
      <GestureDetector gesture={gestures} style={{ flex: 1 }}>
        <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={_onPinchStateChange}>
          <Animated.View style={{ height: windowHeight*.77, width: windowWidth }}>

          { image && <ImageBackground source={{uri:image}} style={[styles.betaImage, { height: windowHeight*.77, width: windowWidth }]} /> }
          { holds.length > 0 && renderHolds }

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
          onPress={ () => startingHolds() }
          style={ [styles.buttonStyle, { backgroundColor: "#E76F51"}]}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> 
      </View>
    </GestureHandlerRootView>
  );
}


