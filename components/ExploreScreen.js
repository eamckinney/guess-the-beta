import React ,{useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Canvas, Path, Circle } from "@shopify/react-native-skia";

export default function ExploreScreen() {
  
  
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Explore.</Text>
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
    fontSize: 50,
    marginBottom: 30,
  },
  
});
