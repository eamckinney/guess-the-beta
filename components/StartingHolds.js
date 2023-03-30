import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, ImageBackground } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles.js';
import { RightHand, LeftHand, RightFoot, LeftFoot } from './StartingHoldSVGs.js';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';

export default function StartingHolds({ route }) {
  
  const [holds, setHolds] = useState(route.params.holds);
  const [image, setImage] = useState(route.params.image);

  const navigation = useNavigation();
  const mapSequence = () => navigation.navigate('Map Sequence', {holds: holds, image: image});

  const standardBackground = 'rgba(231, 111, 81, 0.2)';
  const standardBorder = 'rgba(231, 111, 81, 1.0)';

  const selectedBackground = 'rgba(255, 255, 255, 0.2)';
  const selectedBorder = 'rgba(255, 255, 255, 1.0)';

  const startingPosition = ['Right Hand', 'Left Hand', 'Right Foot', 'Left Foot'];
  
  const [seq, setSeq] = useState();
  const [labelText, setLabelText] = useState();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    let newHolds = [...holds];
    for (let i = 0; i < holds.length; i++) {
      newHolds[i].backgroundColor = standardBackground;
      newHolds[i].borderColor = standardBorder;
    }
    setHolds(newHolds);
    setSeq(1);
    setLabelText(startingPosition[0]);

  }, []);

  // ******************* //
  // TAP TO SELECT HOLDS //

  const tap = Gesture.Tap()
    .maxDistance(5)
    .onStart((g) => {
      if (seq < 5) {
        let dist = new Array(holds.length);
        let newHolds = [...holds];

        for (let i = 0; i < holds.length; i++) {
          dist[i] = Math.abs(holds[i].x - g.x) + Math.abs(holds[i].y - g.y)
        }
        
        const min = Math.min(...dist);
        const selected = dist.indexOf(min);
        
        newHolds[selected].backgroundColor = selectedBackground;
        newHolds[selected].borderColor = selectedBorder;
        newHolds[selected].appendage = [startingPosition[seq-1]];
        setHolds(newHolds);
        
        setSeq(seq+1);
        setLabelText(startingPosition[seq]);
        //console.log('seq: ', seq)
        //console.log(holds);
      }

    });

  // ******************************* //
  // RESET BUTTON TO RESET STARTING POSITION //

  const reset = () => {
    
    let newHolds = [...holds];
    for (let i = 0; i < holds.length; i++) {
      newHolds[i].backgroundColor = standardBackground;
      newHolds[i].borderColor = standardBorder;
      newHolds[i].appendage = [];
    }
    setHolds(newHolds);
    setSeq(1);
    setLabelText(startingPosition[0]);
    
  }

  // ******************************************* //
  // MAP HOLDS ARRAY TO RENDERABLE ANIMATED.VIEW //
  
  const renderAppendages = holds.map((hold, i) => {
    return(
      <Animated.View key={i} style={[
        { 
          position: 'absolute',
          left: hold.x - (hold.radius / 2),
          top: hold.y - (hold.radius / 2),
          width: hold.radius,
          height: hold.radius,
          borderRadius: (hold.radius / 2),
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
        
        <Svg height="80%" width="80%">
        { (hold.appendage && hold.appendage.includes('Right Hand')) ? <RightHand/> : null }
        { (hold.appendage && hold.appendage.includes('Left Hand')) ? <LeftHand/> : null }
        { (hold.appendage && hold.appendage.includes('Right Foot')) ? <RightFoot/> : null }
        { (hold.appendage && hold.appendage.includes('Left Foot')) ? <LeftFoot/> : null }
        </Svg>
        
      </Animated.View>
      
    );
  });



  const circles = holds.map((hold, i) => {
    return(
      <Circle key={i} r={hold.radius/2} cx={hold.x} cy={hold.y-28} fill="black"/>
    );
  });

  const HoldMap = () => {
    return(
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            {circles}
          </Mask>
        </Defs>
        <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.5)" mask="url(#mask)" fill-opacity="0" />
      </Svg>
    );
  };

  const label = 
    seq < 5 
    ?
    <TouchableOpacity
      style={ [styles.label, { backgroundColor: "#2A9D8F"}] }>
      <Text style={styles.buttonText}>{labelText}</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity
      style={ [styles.label, { backgroundColor: "#E76F51"}] }>
      <Text style={styles.buttonText}>All Done! Click Next Below.</Text>
    </TouchableOpacity>
  
  return (
    <GestureHandlerRootView style={[styles.screen]} >
      <Text style={styles.subHead}>2 / Tap your <Text style={{fontWeight: 'bold'}}>starting</Text> hands and feet.</Text>
      <StatusBar hidden={true} />

      <GestureDetector gesture={tap} style={{ flex: 1 }}>
        <Animated.View style={{ height: windowHeight*.77, width: windowWidth, alignItems: 'center', }}>
          { image && <ImageBackground source={{uri:image}} style={[styles.betaImage, { height: windowHeight*.77, width: windowWidth }]} /> } 
          
          <HoldMap />
          {renderAppendages}
          { label }
          
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          onPress={ () => reset() }
          style={ [styles.buttonStyle, { backgroundColor: "#203B44"}]}
          >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity> 
        <TouchableOpacity 
          onPress={ () => mapSequence() }
          style={ [styles.buttonStyle, { backgroundColor: "#E76F51"}] }
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity> 
      </View>
    </GestureHandlerRootView>
  );
  
}
