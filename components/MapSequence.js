import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Canvas from 'react-native-canvas';
import { styles } from '../styles.js';


export default function MapSequence({ route }) {
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
      <Text style={styles.subHead}>Modify.</Text>
      <ImageBackground source={{uri:route.params.image}} style={styles.betaImage}>

        <StatusBar hidden={true} />
        <Canvas ref={route.params.canvas} style={styles.canvas} />
      
      </ImageBackground>
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
