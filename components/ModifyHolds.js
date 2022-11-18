import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Canvas from 'react-native-canvas';


export default function ModifyHolds({ route }) {
  const holds = route.params.holds;

  useEffect(() => {

    if (route.params.canvas.current) {
      const ctx = route.params.canvas.current.getContext('2d');
      
      route.params.canvas.current.height = 915;
      route.params.canvas.current.width = 412;

      if (ctx) {
        console.log('Canvas is ready');
        for (let i = 0; i < holds.length; i++) {
          ctx.beginPath();
          ctx.arc(holds[i][0], holds[i][1], 30, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.strokeStyle = '#E76F51';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.fillStyle = "rgba(0,0,0, 0.2)";
          ctx.fill();
        }
        console.log('Holds added.')
      }
    }

  }, [route.params.canvas]);
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Modify.</Text>
      <ImageBackground source={{uri:route.params.image}} style={styles.betaImage}>

        <StatusBar hidden={true} />
        <Canvas ref={route.params.canvas} style={styles.canvas} />
      
      </ImageBackground>
      <View style={styles.buttonLayout}>
        <TouchableOpacity 
          onPress={ () => modifyHolds() }
          style={styles.buttonLayout}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#264653',
    //alignItems: 'center',
    //justifyContent: 'center',
    
  },
  container: {
    marginHorizontal:20,
    marginVertical:40,
    marginTop: 80,
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
    backgroundColor: "#E76F51",
    borderRadius: 10,
    paddingVertical: 2,
    //paddingHorizontal: 12,
    marginVertical: 10,
    marginHorizontal: 20,
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
