import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path, Circle } from "@shopify/react-native-skia";


export default function CreateBeta() {
  const [image, setImage] = useState(null)
  const navigation = useNavigation();
  
  const [holds, setHolds] = useState([]);
  
  const tap = Gesture.Tap().onStart((g) => {
      console.log(`Tap at ${g.x} ${g.y}`);
    });

  
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

  
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={tap}>
        
        <View style={styles.screen}>
          <StatusBar hidden={true} />
          {image && 
            <Image source={{uri:image}} style={styles.betaImage} />
          }        
          
        </View>
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
    marginTop: 20, 
    width: '100%', 
    height: '100%', 
    alignSelf: 'center'
  }
});

//{image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
//<StatusBar hidden={true} />
//<StatusBar style="auto" />

//<Circle cx={20} cy={20} r={20} color="lightblue" />