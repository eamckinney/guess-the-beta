import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../styles.js';

import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { useFonts, Montserrat_200ExtraLight, Montserrat_400Regular} from '@expo-google-fonts/montserrat';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [image, setImage] = useState(null)
  const [holds, setHolds] = useState(null)
  const [paths, setPaths] = useState(null)
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const createBeta = () => navigation.navigate('Create Beta')
	
    

  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_400Regular
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        
        await Font.loadAsync('Montserrat_200ExtraLight', 'Montserrat_400Regular');
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //await new Promise(resolve => setTimeout(resolve, 2000));

        const savedData = await AsyncStorage.getItem("data");
        const currentData = JSON.parse(savedData);

        setData(currentData);


      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }


    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady & fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const retrieve = async () => {
    try {
      const savedData = await AsyncStorage.getItem("data");
      const currentData = JSON.parse(savedData);

      setData(currentData);

    } catch (error) {
      console.log(error);
    }
  };

  retrieve();
  
  const Betas = data.map((beta, i) => {
    console.log("SINGLE BETA", beta);
    const runBeta = () => navigation.navigate('Create Beta', {
      screen: 'Run Beta',
      params: {holds: beta.holds, image: beta.image, paths: beta.paths}
    });
    
    return(
      <TouchableOpacity
        key={i}
        onPress={() => runBeta()}
      >
        <Image style={styles.challenges} source={{uri:beta.image}}/>
      </TouchableOpacity>
    );

  });
  
  
  
  return (
    <View
      style={styles.screen}
      onLayout={onLayoutRootView}>
        <View style={styles.container}>

          <Text style={styles.title}>Welcome.</Text>

          <View style={styles.buttonLayout}>
            <TouchableOpacity 
              onPress={ () => createBeta() }
              style={styles.buttonLayout}
              >
              <Text style={styles.buttonText}>Add some betas</Text>
              
            </TouchableOpacity> 
          </View>
          <Text style={styles.homeSubHead}>Your saved betas:</Text>
          <View>
            {data ? Betas : <View/>}
            
          </View>

        </View>
    </View>
  );
}
