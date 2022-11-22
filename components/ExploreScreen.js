import React ,{useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Canvas, Path, Circle } from "@shopify/react-native-skia";
import { styles } from '../styles.js';

export default function ExploreScreen() {
  
  
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Explore.</Text>
      </View>
    </View>
  );
  
}
