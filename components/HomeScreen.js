import React, { useCallback, useEffect, useState } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../styles.js';

import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { useFonts, Montserrat_200ExtraLight, Montserrat_400Regular} from '@expo-google-fonts/montserrat';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen({route}) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [data, setData] = useState([]);
  //const [data, setData] = useState(route.params.data);
  //console.log(route);

  const navigation = useNavigation();
  const createBeta = () => navigation.navigate('Create Beta', {
    screen: 'Create Beta'
  })

  const runBeta = () => navigation.navigate('Create Beta', {
    screen: 'Run Beta',
    params: {holds: beta.holds, image: beta.image, paths: beta.paths}
  });
	

  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_400Regular
  });

  const isFocused = useIsFocused()
  console.log(performance.now());

  useEffect(() => {
    
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        
        await Font.loadAsync('Montserrat_200ExtraLight', 'Montserrat_400Regular');
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        //await new Promise(resolve => setTimeout(resolve, 2000));

        if (isFocused) {
          const savedData = await AsyncStorage.getItem("data");
          const currentData = JSON.parse(savedData);

          setData(currentData);
        }
        
      
        


      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }


    prepare();
  }, [isFocused]);

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

  const ListItem = ({ image, id }) => {
    
    return(
      <View style={styles.betaLayout}>
        <Image style={styles.challenges} source={{uri:image}}/>
        <TouchableOpacity 
          onPress={ () => deleteBeta(id) }
          style={styles.deleteStyle}
          >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity> 
      </View>
   );
  }

  // not working... 
  // <Swipeable renderRightActions={renderRightActions}> around <View> in ListItem
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0]
    })
    return (
      <>
        <TouchableOpacity onPress={() => alert('Delete button pressed')}>
          <View
            style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}>
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{ scale }]
              }}>
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    )
  }
  
  const deleteBeta = async (id) => {
    try {
      console.log("id",id);
      console.log("data",data);
      console.log("length before delete",data.length);

      let newData = data.filter(beta => beta.id !== id);

      await AsyncStorage.setItem("data", JSON.stringify(newData));
      setData(newData);

      console.log("length after delete",data.length);

    } catch (error) {
      console.log(error);
    }
  };
  
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

          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ListItem {...item} />}
          />
        </View>
    </View>
  );
}
