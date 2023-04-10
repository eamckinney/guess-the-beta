import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';

import { styles } from '../styles.js';
import { SvgXml } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg"

import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { useFonts, Montserrat_200ExtraLight, Montserrat_400Regular} from '@expo-google-fonts/montserrat';

import { UpsideDown } from './SVGExports.js';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  const navigation = useNavigation();
  const createBeta = () => navigation.navigate('Create Beta')

  const [image,setImage] = useState(null)
  
  //Orange Mountain SVG - Not displaying but displacing other assets
  const xml = '<svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 296 362.21"><defs><style>.cls-1{fill:#c18053;}.cls-2{fill:#e0925c;}</style></defs><g id="Layer_1-2"><g><path class="cls-2" d="m0,.37h296v361.84L0,.37Z"/><path class="cls-1" d="m289.03,337.57L111.52,0,0,.37l296,361.84-6.97-24.64Z"/></g></g></svg>'
  
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

  const PageDivider = ({ hasExtraLayer = true, fill = "#4279DD" }) => (
    <>
      <Svg width="100%" height="320" preserveAspectRatio="xMinYMax" viewBox="0 0 1440 320">
        <G {...{ fill }}>
          {hasExtraLayer &&
            <Path d="M0,128 L288,224 L576,192 L864,160 L1152,320 L1440,288 L1440,320 L1152,320 L864,320 L576,320 L288,320 L0,320Z" />
          }
          <Path fillOpacity="0.6" d="M0,128 L80,138.7C160,149,320,171,480,197.3C640,224,800,256,960,266.7 C1120,277, 1280,267, 1360,261.3 L1440,256 L1440,320 L1360,320 C1280,320,1120,320,960,320 C800,320, 640,320, 480,320 C320,320, 160,320, 80,320 L0,320 Z" />
        </G>
      </Svg >
      <View style={styles.container} />
    </>
   )
  
  return (
    <View
      style={styles.screen}
      onLayout={onLayoutRootView}>
      <View style={styles.container}>
          <Text style={styles.title}>Welcome.</Text>
       <View style={styles.textBeforeWelcomeButtons}  >


        <Text style={styles.TextForChallenges}>Your Beta Challenges</Text>

       </View>
       
       

       <View position="absolute" top={-30} right={-10} zIndex={1}>
        <Svg >
          <UpsideDown height={500} width={300} zIndex={1}/>
        </Svg>
       </View>

       <View>
      

     
      

      
      </View>

        <View style={styles.buttonRowSpacer}>
          <View style={styles.buttonLayout}>
            <TouchableOpacity 
              //onPress={ () => createBeta() }
              style={styles.buttonLayout}
              >
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>  
          </View>

          <View style={styles.buttonLayout}>
            <TouchableOpacity 
              //onPress={ () => createBeta() }
              style={styles.buttonLayout}
              >
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>  
          </View>

          <View style={styles.buttonLayout}>
            <TouchableOpacity 
              //onPress={ () => createBeta() }
              style={styles.buttonLayout}
              >
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>  
          </View>

          </View>
          
          

      </View>
    </View>
  );
}
