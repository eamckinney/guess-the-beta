import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Canvas from 'react-native-canvas';
import { styles } from '../styles.js';

export default function CreateBeta() {
  const [image, setImage] = useState(null)
  
  const navigation = useNavigation();

  const backToChallenges = () => navigation.navigate('Challenges')
  const modifyHolds = () => navigation.navigate('Modify Holds', {canvas: canvas, holds: holds, image: image});

  const [holds, setHolds] = useState([]);

  const canvas = useRef(null);
  
  const tap = Gesture.Tap()
    .maxDistance(2)
    .onStart((g) => {
      //console.log(`Tap at ${g.x} ${g.y}`);
      const ctx = canvas.current.getContext('2d');

      /*for (let i = 0; i < holds.length; i++) {
        if (g.x >= (holds[i][0]-15) && g.x <= (holds[i][0]+15) && g.y >= (holds[i][1]-15) && g.y <= (holds[i][1]+15)) {
          removeHold(holds[i][0],holds[i][1], ctx);
          console.log("there's another hold there!");
          return;
        } else { continue; }
      }*/

      addHold(g.x, g.y, 30, ctx);
    });

  const addHold = (x, y, r, ctx) => {
    if (!ctx) { ctx = canvas.current.getContext('2d'); }

    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = '#E76F51';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0, 0.2)";
    ctx.fill();
    ctx.closePath();

    setHolds([...holds, [x,y,r]]);
    console.log(`circle added at ${x} and ${y}`);
    console.log("holds.length: " + holds.length);

    //console.log(`holds: ${holds}`);
  }

  const removeHold = (x, y, r, ctx) => {

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.closePath();

    console.log("holds.length: " + holds.length);
    holds.splice(holds.indexOf([x,y]), 1);
    console.log("holds.length: " + holds.length);

    console.log(`circle REMOVED at ${x} and ${y}`);
  }

  const undo = () => {
    const ctx = canvas.current.getContext('2d');

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath();
    ctx.arc(holds[holds.length-1][0], holds[holds.length-1][1], holds[holds.length-1][2], 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.closePath();

    console.log("hold to remove: " + holds[holds.length-1][0], holds[holds.length-1][1]);
    holds.splice(holds.indexOf([holds[holds.length-1][0],holds[holds.length-1][1]]), 1);
    console.log("holds: " + holds);
  }

  let pinchScale = 1;
  const pinch = Gesture.Pinch().onUpdate((g) => {
    //scale.value = savedScale.value * g.scale;
    console.log(`pinch! scale: ${g.scale}, coordinates: ${g.focalX}, ${g.focalY}`);
    pinchScale = g.scale;

  }).onEnd(() => {
    resizeHold(pinchScale);
  })

  const gestures = Gesture.Simultaneous(pinch, tap);

  const resizeHold = (scale) => {
    const currentHold = [holds[holds.length-1][0], holds[holds.length-1][1], holds[holds.length-1][2]];

    undo();
    addHold(currentHold[0], currentHold[1], (currentHold[2]*scale), null);
  }
  
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
    
    

    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      
      canvas.current.height = 915;
      canvas.current.width = 412;

      if (ctx) {
        console.log('Canvas is ready');
      }
    }

  }, [canvas]);

  
  
  return (
    <GestureHandlerRootView style={styles.screen}>
      <Text style={styles.subHead}>Select your holds.</Text>
      <GestureDetector gesture={gestures} style={{ flex: 1 }}>
        <ImageBackground source={{uri:image}} style={styles.betaImage}>

          <StatusBar hidden={true} />
          <Canvas ref={canvas} style={styles.canvas} />
        
        </ImageBackground>
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


//{image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
//<StatusBar hidden={true} />
//<StatusBar style="auto" />

// REACT-NATIVE-CANVAS: https://www.atomlab.dev/tutorials/react-native-canvas

// RE-SIZE & MOVE CIRCLES? https://blog.bitsrc.io/using-the-gesture-handler-in-react-native-c07f84ddfa49
// USE PINCH: https://docs.swmansion.com/react-native-gesture-handler/docs/2.0.0/api/gestures/pinch-gesture/

// CALLBACK?? https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780

// https://medium.com/react-native-rocket/building-a-hand-drawing-app-with-react-native-skia-and-gesture-handler-9797f5f7b9b4
// https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/tap-gesture

// CSS Organization Method🤓 - https://freecontent.manning.com/applying-and-organizing-styles-in-react-native/