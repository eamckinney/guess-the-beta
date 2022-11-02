import React ,{useState} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';


export default function BetaScreen() {
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
  
  
  
  return (
    <View style={styles.container}>
      <Text>Add betas here!</Text>
      
      <StatusBar hidden={true} />
      {image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
      <Button title="Pick Image" onPress={pickImage}/>
      <StatusBar style="auto" />

      <Button
        title="Go back hooooome"
        onPress={() =>
          this.props.navigation.navigate('Home')
        }
      />

    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

