import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Canvas from 'react-native-canvas';
//import { Canvas, Path, Circle } from "@shopify/react-native-skia";



export default function CreateBeta() {
  const [image, setImage] = useState(null)
  
  const navigation = useNavigation();
  const [holds, setHolds] = useState([]);

  const ref = useRef(null);
  
  const tap = Gesture.Tap().onStart((g) => {
      console.log(`Tap at ${g.x} ${g.y}`);
      addHold(g.x, g.y);
    });

  const addHold = (x, y) => {
    const ctx = ref.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(100, 150, 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
    console.log(`circle added at ${x} and ${y}`);
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

    if (ref.current) {
      const ctx = ref.current.getContext('2d');

      if (ctx) {
        console.log('Canvas is ready');
      }
    }

  }, [ref]);

  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tap}>
        <ImageBackground source={{uri:image}} style={styles.betaImage}>

          <StatusBar hidden={true} />
          <Canvas ref={ref} style={styles.canvas} />
        
        </ImageBackground>
      </GestureDetector>
    </GestureHandlerRootView>
  );
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#264653',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  betaImage: {
    width: '100%', 
    height: '100%', 
    alignSelf: 'center',
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    width: '100%', 
    height: '100%', 
    backgroundColor: 'black',
    opacity: 0.5,
    //alignSelf: 'center',
    //justifyContent: 'center',
  }
});

//{image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
//<StatusBar hidden={true} />
//<StatusBar style="auto" />

// REACT-NATIVE-CANVAS: https://www.atomlab.dev/tutorials/react-native-canvas

// CALLBACK?? https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780

// https://medium.com/react-native-rocket/building-a-hand-drawing-app-with-react-native-skia-and-gesture-handler-9797f5f7b9b4
// https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/tap-gesture