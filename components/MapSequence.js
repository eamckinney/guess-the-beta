import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles.js";
import Svg, { Polyline } from "react-native-svg";
import { RightHand, LeftHand, RightFoot, LeftFoot } from './StartingHoldSVGs.js';


export default function MapSequence({ route }) {
	const [holds, setHolds] = useState(route.params.holds);
	const [image, setImage] = useState(route.params.image);

	const examplePath = [{ x: 0, y: 0 }];

	const [path, setPath] = useState(examplePath);
	const [paths, setPaths] = useState([examplePath]);
	const [moves, setMoves] = useState(examplePath);

	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	const navigation = useNavigation();
	const runBeta = () => navigation.navigate('Run Beta', {holds: holds, image: image, paths: paths, moves: moves});

	useEffect(() => {}, []);

	// ******************************* //
	// PAN TO CREATE PATHS IN BETWEEN HOLDS //

	const pan = Gesture.Pan()
		.maxPointers(1)
		.onStart(() => {
			setPath([]);
		})
		.onUpdate((e) => {
			setPath([...path, { x: e.x, y: e.y }]);
		})
		.onEnd(() => {
	
			let firstHoldDistance = [];
			let lastHoldDistance = [];
			for (let i = 0; i < holds.length; i++) {
				firstHoldDistance[i] = Math.abs(path[0].x - holds[i].x) + Math.abs((path[0].y) - holds[i].y);
				lastHoldDistance[i] = Math.abs(path[path.length-1].x - holds[i].x) + Math.abs((path[path.length-1].y) - holds[i].y);
			}

			const firstHoldIndex = firstHoldDistance.indexOf(Math.min(...firstHoldDistance));
			const lastHoldIndex = lastHoldDistance.indexOf(Math.min(...lastHoldDistance));

			const firstHold = holds[firstHoldIndex]
			const lastHold = holds[lastHoldIndex]

			setPath([{ x: firstHold.x, y: firstHold.y }, { x: lastHold.x, y: lastHold.y }]);
			// USE PATHS TO RUN BETA??
			setPaths([...paths, [{ x: firstHold.x, y: firstHold.y }, { x: lastHold.x, y: lastHold.y }]]);

			const slope = -(lastHold.y - firstHold.y) / (lastHold.x - firstHold.x);
			if (slope > 0) {
				setMoves([...moves, { x: firstHold.x - ((firstHold.x - lastHold.x)/2), y: firstHold.y - ((firstHold.y - lastHold.y)/2) } ])
			} else {
				setMoves([...moves, { x: firstHold.x - ((firstHold.x - lastHold.x)/2), y: (firstHold.y - ((firstHold.y - lastHold.y)/2)) - 20 } ])
			}

			let newHolds = [...holds];
			newHolds[lastHoldIndex].appendage = newHolds[firstHoldIndex].appendage;
			if (newHolds[lastHoldIndex].seq) {
				newHolds[lastHoldIndex].seq = [...newHolds[lastHoldIndex].seq, { order: paths.length, appendage: newHolds[firstHoldIndex].appendage[0], from: { x: firstHold.x, y: firstHold.y }, to: { x: lastHold.x, y: lastHold.y } }];
			} else {
				newHolds[lastHoldIndex].seq = [ { order: paths.length, appendage: newHolds[firstHoldIndex].appendage[0], from: { x: firstHold.x, y: firstHold.y }, to: { x: lastHold.x, y: lastHold.y } } ];
			}
			
			newHolds[firstHoldIndex].appendage = [];
			setHolds(newHolds);
			console.log(holds);

		});

	const InProcessPath = () => {
		const points = path ? path.map((p) => `${p.x},${p.y}`).join(" ") : "";
		return (
			<Polyline points={points} fill="none" stroke="white" strokeWidth="1" />
		);
	};

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

	// ******************************* //
	// UNDO BUTTON TO REMOVE LAST PATH //

	const undo = () => {
		setPaths((current) => current.slice(0, -1));
		setMoves((current) => current.slice(0, -1));
		setPath([]);
	};

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
				<Svg height="80%" width="80%">
				{ (hold.appendage && hold.appendage.includes('Right Hand')) ? <RightHand/> : null }
        { (hold.appendage && hold.appendage.includes('Left Hand')) ? <LeftHand/> : null }
        { (hold.appendage && hold.appendage.includes('Right Foot')) ? <RightFoot/> : null }
        { (hold.appendage && hold.appendage.includes('Left Foot')) ? <LeftFoot/> : null }
        </Svg>
			</Animated.View>
		);
	});

	return (
		<GestureHandlerRootView style={styles.screen}>
			<Text style={styles.bodyText}>
				Now, draw lines between holds to create your beta.
			</Text>
			<StatusBar hidden={true} />
			<GestureDetector gesture={pan} style={{ flex: 1 }}>
				<View style={{ height: windowHeight * 0.77, width: windowWidth, alignItems: "center"}} >
					<View>
						{image && (<Image source={{ uri: image }} style={[styles.betaImage, { height: windowHeight, width: windowWidth }]}/>)}
						{renderHolds}
						{MoveNumbers}
					</View>

					<Svg height="100%" width="100%" viewBox={`0 0 ${windowWidth} ${windowHeight * 0.77}`} style={{ position: "absolute", top: 0, zIndex: 1 }}>
						<InProcessPath />
						{GesturePaths}
					</Svg>
				</View>
			</GestureDetector>

			<View style={styles.buttonRow}>
				<TouchableOpacity
					onPress={() => undo()}
					style={[styles.buttonStyle, { backgroundColor: "#203B44" }]}
				>
					<Text style={styles.buttonText}>Undo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => runBeta()}
					style={[styles.buttonStyle, { backgroundColor: "#E76F51" }]}
				>
					<Text style={styles.buttonText}>Run!</Text>
				</TouchableOpacity>
			</View>
		</GestureHandlerRootView>
	);
}
