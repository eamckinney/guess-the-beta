import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';

import { styles } from '../styles.js';

import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { useFonts, Montserrat_200ExtraLight, Montserrat_400Regular} from '@expo-google-fonts/montserrat';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  const navigation = useNavigation();
  const createBeta = () => navigation.navigate('Create Beta')

  const [image,setImage] = useState(null)
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

        </View>
    </View>
  );
}
