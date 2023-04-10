import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Animated, Dimensions, ImageBackground, Modal, TextInput, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { styles } from "../styles.js";
import { Svg, Defs, Rect, Mask, Circle, Polyline } from 'react-native-svg';
import { RightHand, LeftHand, RightFoot, LeftFoot } from './StartingHoldSVGs.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MapSequence({ route }) {
	const [holds, setHolds] = useState(route.params.holds);
	const [image, setImage] = useState(route.params.image);
  const [paths, setPaths] = useState(route.params.paths);
	const [data, setData] = useState(route.params.data);
	//const [moves, setMoves] = useState(route.params.moves);

	// This is to manage Modal State
	const [isModalVisible, setModalVisible] = useState(false);
	const [betaName, setBetaName] = useState("");

	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	const navigation = useNavigation();
	//const goHome = () => navigation.navigate('Challenges', {data: newData});

	const goHome = () => navigation.navigate('Challenges', {
    screen: 'Challenges',
    params: {data: data}
  });

	// ************************************** //
	// INITIAL ANIMATED VALUES FOR APPENDAGES //

  const initialRightHandMoveX = useRef(new Animated.Value(0)).current;
	const initialRightHandMoveY = useRef(new Animated.Value(0)).current;
	const initialLeftHandMoveX = useRef(new Animated.Value(0)).current;
	const initialLeftHandMoveY = useRef(new Animated.Value(0)).current;
	const initialRightFootMoveX = useRef(new Animated.Value(0)).current;
	const initialRightFootMoveY = useRef(new Animated.Value(0)).current;
	const initialLeftFootMoveX = useRef(new Animated.Value(0)).current;
	const initialLeftFootMoveY = useRef(new Animated.Value(0)).current;

  const duration = 1000;


	// ******************************************************* //
	// CALCULATING PATHWAY COORDINATES FOR APPENDAGE ANIMATION //

	// RIGHT HAND //
	const rightHandDiff = paths
		.map((path, i) => {
			if (path[0].appendage && path[0].appendage.includes('Right Hand')) {
				return({
					i: i,
					changeX: path[1].x - path[0].x,
					changeY: path[1].y - path[0].y,
				});
			}
		})
		.filter(item => item !== undefined);

	let rightHandPaths = [];
	for (let i = 0; i < rightHandDiff.length; i++) {
		rightHandPaths.push({
			i: rightHandDiff[i].i,
			changeX: rightHandDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeX,
					0,
				),
			changeY: rightHandDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeY,
					0,
				),
		})
	}

	// LEFT HAND //
	const leftHandDiff = paths
		.map((path, i) => {
			if (path[0].appendage && path[0].appendage.includes('Left Hand')) {
				return({
					i: i,
					changeX: path[1].x - path[0].x,
					changeY: path[1].y - path[0].y,
				});
			}
		})
		.filter(item => item !== undefined);

	let leftHandPaths = [];
	for (let i = 0; i < leftHandDiff.length; i++) {
		leftHandPaths.push({
			i: leftHandDiff[i].i,
			changeX: leftHandDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeX,
					0,
				),
			changeY: leftHandDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeY,
					0,
				),
		})
	}

	// RIGHT FOOT //
	const rightFootDiff = paths
		.map((path, i) => {
			if (path[0].appendage && path[0].appendage.includes('Right Foot')) {
				return({
					i: i,
					changeX: path[1].x - path[0].x,
					changeY: path[1].y - path[0].y,
				});
			}
		})
		.filter(item => item !== undefined);

	let rightFootPaths = [];
	for (let i = 0; i < rightFootDiff.length; i++) {
		rightFootPaths.push({
			i: rightFootDiff[i].i,
			changeX: rightFootDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeX,
					0,
				),
			changeY: rightFootDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeY,
					0,
				),
		})
	}

	// LEFT FOOT //
	const leftFootDiff = paths
		.map((path, i) => {
			if (path[0].appendage && path[0].appendage.includes('Left Foot')) {
				return({
					i: i,
					changeX: path[1].x - path[0].x,
					changeY: path[1].y - path[0].y,
				});
			}
		})
		.filter(item => item !== undefined);

	let leftFootPaths = [];
	for (let i = 0; i < leftFootDiff.length; i++) {
		leftFootPaths.push({
			i: leftFootDiff[i].i,
			changeX: leftFootDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeX,
					0,
				),
			changeY: leftFootDiff
				.slice(0,i+1)
				.reduce(
					(accumulator, currentValue) => accumulator + currentValue.changeY,
					0,
				),
		})
	}


	// **************************** //
	// CREATING APPENDAGE ANIMATION //

	let AnimationSequence = []

	useEffect(() => {

		// loop through total # of paths, figure out which appendage moves, then add it to the sequence
		for (let i = 0; i < paths.length; i++) {
			const foundRightHand = rightHandPaths.find(item => item.i == i+1);
			const foundLeftHand = leftHandPaths.find(item => item.i == i+1);
			const foundRightFoot = rightFootPaths.find(item => item.i == i+1);
			const foundLeftFoot = leftFootPaths.find(item => item.i == i+1);

			if (foundRightHand) {
				AnimationSequence.push(
					Animated.parallel([
						Animated.timing(initialRightHandMoveX, {
							toValue: foundRightHand.changeX,
							duration: duration,
							useNativeDriver: true,
						}),
						Animated.timing(initialRightHandMoveY, {
							toValue: foundRightHand.changeY,
							duration: duration,
							useNativeDriver: true,
						}),
					]))
			} else if (foundLeftHand) {
				AnimationSequence.push(
					Animated.parallel([
						Animated.timing(initialLeftHandMoveX, {
							toValue: foundLeftHand.changeX,
							duration: duration,
							useNativeDriver: true,
						}),
						Animated.timing(initialLeftHandMoveY, {
							toValue: foundLeftHand.changeY,
							duration: duration,
							useNativeDriver: true,
						}),
					]))
			} else if (foundRightFoot) {
				AnimationSequence.push(
					Animated.parallel([
						Animated.timing(initialRightFootMoveX, {
							toValue: foundRightFoot.changeX,
							duration: duration,
							useNativeDriver: true,
						}),
						Animated.timing(initialRightFootMoveY, {
							toValue: foundRightFoot.changeY,
							duration: duration,
							useNativeDriver: true,
						}),
					]))
			} else if (foundLeftFoot) {
				AnimationSequence.push(
					Animated.parallel([
						Animated.timing(initialLeftFootMoveX, {
							toValue: foundLeftFoot.changeX,
							duration: duration,
							useNativeDriver: true,
						}),
						Animated.timing(initialLeftFootMoveY, {
							toValue: foundLeftFoot.changeY,
							duration: duration,
							useNativeDriver: true,
						}),
					]))
			}
		}
		
		console.log('AnimationSequence.length: ',AnimationSequence.length);

		Animated.sequence(AnimationSequence).start();

  }, [initialRightHandMoveX, initialRightHandMoveY, initialLeftHandMoveX, initialLeftHandMoveY, initialRightFootMoveX, initialRightFootMoveY, initialLeftFootMoveX, initialLeftFootMoveY]);


	// **************** //
	// RENDERABLE PATHS //

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

	// *********************** //
	// RENDERABLE MOVE NUMBERS //
	/*const MoveNumbers = moves.map((move, i) => {
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
	});*/

	// ******************************************* //
	// MAP HOLDS ARRAY TO RENDERABLE ANIMATED.VIEW //
	const circles = useMemo(() => holds.map((hold, i) => {
		return(
			<Circle key={i} r={hold.radius/2} cx={hold.x} cy={hold.y-28} fill="black"/>
		);
	}));

	const HoldMap = useMemo(() => {
		return(
			<Svg height={windowHeight*.771} width={windowWidth} style={{ position: "relative", top: 0}}>
				<Defs>
					<Mask id="mask" x="0" y="0" height="100%" width="100%">
						<Rect height="100%" width="100%" fill="#fff" />
						{circles}
					</Mask>
				</Defs>
				<Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.5)" mask="url(#mask)" fill-opacity="0" />
			</Svg>
		);
	});  

	// ********************************** //
	// RENDER APPENDAGES, APPLY ANIMATION //

	const RenderAppendages = useMemo(() => holds
		.filter(hold => hold.startingAppendage && hold.startingAppendage.length > 0)
		.map((hold, i) => {
			return(
				<Animated.View key={i} style={[
					{ 
						position: 'absolute',
						left: hold.x - (15),
						top: hold.y - (15) + 1,
						width: 30,
						height: 30,
						borderRadius: (15),
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}>					
					{ 
						(hold.startingAppendage.includes('Right Hand')) ?
						<Animated.View height="100%" width="100%" style={{ alignItems: 'center', justifyContent: 'center', translateX: initialRightHandMoveX, translateY: initialRightHandMoveY }}>
							<Svg height="70%" width="70%">
								<RightHand/>
							</Svg>
						</Animated.View> 
						: null
					}

					{
						(hold.startingAppendage.includes('Left Hand')) ?
						<Animated.View height="100%" width="100%" style={{ alignItems: 'center', justifyContent: 'center', translateX: initialLeftHandMoveX, translateY: initialLeftHandMoveY }}>
							<Svg height="70%" width="70%">
							<LeftHand/>
							</Svg>
						</Animated.View>
						: null
					}

					{
						(hold.startingAppendage.includes('Right Foot')) ?
						<Animated.View height="100%" width="100%" style={{ alignItems: 'center', justifyContent: 'center', translateX: initialRightFootMoveX, translateY: initialRightFootMoveY }}>
							<Svg height="70%" width="70%">
							<RightFoot/>
							</Svg>
						</Animated.View>
						: null
					}

					{
						(hold.startingAppendage.includes('Left Foot')) ?
						<Animated.View height="100%" width="100%" style={{ alignItems: 'center', justifyContent: 'center', translateX: initialLeftFootMoveX, translateY: initialLeftFootMoveY }}>
							<Svg height="70%" width="70%">
							<LeftFoot/> 
							</Svg>
						</Animated.View>
						: null
					}

				</Animated.View>
				
			);
	}));

	const toggleModalVisibility = () => {
		setModalVisible(!isModalVisible);
		console.log(betaName);
	};

	const Save = (holds, paths, image, betaName) => {
		toggleModalVisibility();

		//console.log("IMAGE: ", image);
		
		let newData = [];
		const store = async () => {
			try {
				const savedData = await AsyncStorage.getItem("data");
        const currentData = JSON.parse(savedData);

				const newBeta = {
					id: currentData ? currentData.length : 0,
					betaName: betaName,
					image: image,
					holds: holds,
					paths: paths,
				}

				if (currentData) {
					newData = [...currentData, newBeta];
				} else {
					newData = [newBeta];
				}
				
				await AsyncStorage.setItem("data", JSON.stringify(newData));

				setData(newData);

			} catch (error) {
				console.log(error);
			}
		};
	
		store();		

		goHome();
	
	}

  return (
		<GestureHandlerRootView style={styles.screen}>
			<Text style={styles.subHead}>
				Look at 'em climb!
			</Text>
			<StatusBar hidden={true} />
			
      <View style={{ height: windowHeight * 0.77, width: windowWidth, alignItems: "center"}} >
        <View>
					{ image && <ImageBackground source={{uri:image}} style={[styles.betaImage, { height: windowHeight*.77, width: windowWidth }]} /> } 

					{HoldMap}
					{RenderAppendages}
					{/*MoveNumbers*/}
					
				</View>

				<Svg height="100%" width="100%" viewBox={`0 0 ${windowWidth} ${windowHeight * 0.77}`} style={{ position: "absolute", top: 0, zIndex: 1 }}>
					{GesturePaths}

				</Svg>

				<Modal animationType="slide" 
							transparent visible={isModalVisible} 
							presentationStyle="overFullScreen" 
							onDismiss={() => Save(holds, paths, image, betaName)}>
						<View style={styles.viewWrapper}>
							<View style={styles.modalView}>
								<TextInput placeholder="Name your beta!" 
														value={betaName} style={styles.textInput} 
														onChangeText={(value) => setBetaName(value)} />
								{/** This button is responsible to close the modal */}
								<Button title="Save Beta" onPress={() => Save(holds, paths, image, betaName)} />
							</View>
						</View>
				</Modal>

      </View>

			<View style={styles.buttonRow}>
				<TouchableOpacity
					//onPress={() => undo()}
					style={[styles.buttonStyle, { backgroundColor: "#203B44" }]}
				>
					<Text style={styles.buttonText}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => toggleModalVisibility()}
					style={[styles.buttonStyle, { backgroundColor: "#2A9D8F" }]}
				>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>
			</View>
		</GestureHandlerRootView>
	);
}

//function 