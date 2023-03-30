import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles.js";
import Svg, { Polyline } from "react-native-svg";
import { RightHand, LeftHand, RightFoot, LeftFoot } from './StartingHoldSVGs.js';

export default function MapSequence({ route }) {
	const [holds, setHolds] = useState(route.params.holds);
	const [image, setImage] = useState(route.params.image);
  const [paths, setPaths] = useState(route.params.paths);
	const [moves, setMoves] = useState(route.params.moves);

	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

  //USE PATHS VARIABLE TO DETERMINE COORDINATES??
  const initialMoveX = useRef(new Animated.Value(0)).current;
	const initialMoveY = useRef(new Animated.Value(0)).current;
  const endMoveX = 10;
	const endMoveY = 10;
  const duration = 2000;


	useEffect(() => {
    Animated.sequence([
      Animated.parallel([
				Animated.timing(initialMoveX, {
					toValue: endMoveX,
					duration: duration,
					useNativeDriver: true,
				}),
				Animated.timing(initialMoveY, {
					toValue: endMoveY,
					duration: duration,
					useNativeDriver: true,
				}),
			]),
    ]).start();
  }, [initialMoveX, initialMoveY]);

	const GesturePaths = paths.map((line, i) => {
		const points = line ? line.map((p) => `${p.x},${p.y}`).join(" ") : "";
		return (
			<Polyline
				key={i}
				points={points}
				fill="none"
				stroke="white"
				strokeWidth="1"
			/>
		);
	});

	const MoveNumbers = moves.map((move, i) => {
		if (i == 0) { return }
		else {
			return (
				<Animated.View
					key={i}
					style={[
						{
							position: "absolute",
							left: move.x,
							top: move.y,
							width: 20,
							height: 20,
							alignItems: "center",
							justifyContent: "center",
						},
					]}
				>
					<Text style={{color: 'white'}}>{i}</Text>
				</Animated.View>
			);
		}
		
	});

	// ******************************************* //
	// MAP HOLDS ARRAY TO RENDERABLE ANIMATED.VIEW //

	const renderHolds = holds.map((hold, i) => {
		return (
			<Animated.View
				key={i}
				style={[
					styles.circleShape,
					{
						position: "absolute",
						left: hold.x - hold.radius / 2,
						top: hold.y - hold.radius / 2,
						width: hold.radius,
						height: hold.radius,
						borderRadius: hold.radius / 2,
						backgroundColor: hold.backgroundColor,
						borderColor: hold.borderColor,
						alignItems: "center",
						justifyContent: "center",
					},
				]}
			>
        <Animated.View height="100%" width="100%" style={{ alignItems: 'center', justifyContent: 'center', translateX: initialMoveX, translateY: initialMoveY }}>
          <Svg height="80%" width="80%">
          { (hold.appendage && hold.appendage.includes('Right Hand')) ? <RightHand/> : null }
          { (hold.appendage && hold.appendage.includes('Left Hand')) ? <LeftHand/> : null }
          { (hold.appendage && hold.appendage.includes('Right Foot')) ? <RightFoot/> : null }
          { (hold.appendage && hold.appendage.includes('Left Foot')) ? <LeftFoot/> : null }
          </Svg>
        </Animated.View>
			</Animated.View>
		);
	});






  return (
		<GestureHandlerRootView style={styles.screen}>
			<Text style={styles.bodyText}>
				Look at 'em climb!
			</Text>
			<StatusBar hidden={true} />
			
      <View style={{ height: windowHeight * 0.77, width: windowWidth, alignItems: "center"}} >
        <View>
          {image && (<Image source={{ uri: image }} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]}/>)}
          {renderHolds}
          {MoveNumbers}
        </View>

        <Svg height="100%" width="100%" viewBox={`0 0 ${windowWidth} ${windowHeight * 0.77}`} style={{ position: "absolute", top: 0, zIndex: 1 }}>
          {GesturePaths}
					{/*console.log("paths:", paths)*/}

        </Svg>
      </View>

			<View style={styles.buttonRow}>
				<TouchableOpacity
					//onPress={() => undo()}
					style={[styles.buttonStyle, { backgroundColor: "#203B44" }]}
				>
					<Text style={styles.buttonText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					//onPress={() => runBeta()}
					style={[styles.buttonStyle, { backgroundColor: "#2A9D8F" }]}
				>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>
			</View>
		</GestureHandlerRootView>
	);
}