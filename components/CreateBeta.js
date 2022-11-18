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

  const backToChallenges = () => navigation.navigate('Challenges')
  const modifyHolds = () => navigation.navigate('Modify Holds', {canvas: canvas, holds: holds, image: image});

  const [holds, setHolds] = useState([]);

  const canvas = useRef(null);
  
  const tap = Gesture.Tap().onStart((g) => {
      //console.log(`Tap at ${g.x} ${g.y}`);
      const ctx = canvas.current.getContext('2d');

      /*for (let i = 0; i < holds.length; i++) {
        if (g.x >= (holds[i][0]-15) && g.x <= (holds[i][0]+15) && g.y >= (holds[i][1]-15) && g.y <= (holds[i][1]+15)) {
          removeHold(holds[i][0],holds[i][1], ctx);
          console.log("there's another hold there!");
          return;
        } else { continue; }
      }*/

      addHold(g.x, g.y, ctx);
    });

  const addHold = (x, y, ctx) => {
    
    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.strokeStyle = '#E76F51';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0, 0.2)";
    ctx.fill();
    ctx.closePath();

    setHolds([...holds, [x,y]]);
    console.log(`circle added at ${x} and ${y}`);
    console.log("holds.length: " + holds.length);

    //console.log(`holds: ${holds}`);
  }

  const removeHold = (x, y, ctx) => {

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
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
    ctx.arc(holds[holds.length-1][0], holds[holds.length-1][1], 30, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.closePath();

    console.log("hold to remove: " + holds[holds.length-1][0], holds[holds.length-1][1]);
    holds.splice(holds.indexOf([holds[holds.length-1][0],holds[holds.length-1][1]]), 1);
    console.log("holds: " + holds);


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
      <Text style={styles.title}>Select your holds.</Text>
      <GestureDetector gesture={tap} style={{ flex: 1 }}>
        <ImageBackground source={{uri:image}} style={styles.betaImage}>

          <StatusBar hidden={true} />
          <Canvas ref={canvas} style={styles.canvas} />
        
        </ImageBackground>
      </GestureDetector>
      <View style={styles.buttonLayout}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#264653',
    
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 30,
  },
  betaImage: {
    flex: 1,
    marginTop: 30, 
    width: '100%', 
    height: '100%', 
    alignSelf: 'center',
    resizeMode: 'cover',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  buttonLayout: {
    fontFamily: 'Montserrat_200ExtraLight',
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20, 
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 50 
  },
  buttonText: {
    fontSize: 13,
    color: "#fff",
    fontFamily: 'Montserrat_400Regular',
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  canvas: {
    //backgroundColor: 'black',
    //opacity: 0.5,
    //alignSelf: 'center',
    //justifyContent: 'center',
  }
});

//{image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
//<StatusBar hidden={true} />
//<StatusBar style="auto" />

// REACT-NATIVE-CANVAS: https://www.atomlab.dev/tutorials/react-native-canvas
// RE-SIZE & MOVE CIRCLES? https://blog.bitsrc.io/using-the-gesture-handler-in-react-native-c07f84ddfa49

// CALLBACK?? https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780

// https://medium.com/react-native-rocket/building-a-hand-drawing-app-with-react-native-skia-and-gesture-handler-9797f5f7b9b4
// https://docs.swmansion.com/react-native-gesture-handler/docs/api/gestures/tap-gesture