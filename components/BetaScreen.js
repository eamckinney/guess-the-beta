import React ,{useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
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
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Add betas.</Text>
        
        

        <View style={styles.buttonLayout}>
          <TouchableOpacity 
            onPress={pickImage}
            style={styles.buttonLayout}>
            <Text style={styles.buttonText}>Choose Image of Route</Text>
          </TouchableOpacity> 
        </View>

        {image && <Image source={{uri:image}} style={styles.betaImage} />}
        
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#264653',
    //alignItems: 'center',
    //justifyContent: 'center',
    
  },
  container: {
    marginHorizontal:20,
    marginVertical:40,
    marginTop: 80,
  },
  title: {
    color: '#fff',
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 50,
    marginBottom: 30,
  },
  buttonLayout: {
    fontFamily: 'Montserrat_200ExtraLight',
    backgroundColor: "#CE624D",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 13,
    color: "#fff",
    fontFamily: 'Montserrat_400Regular',
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  betaImage: {
    marginTop: 20, 
    width: '100%', 
    height: '75%', 
    alignSelf: 'center'
  }
});

//{image && <Image source={{uri:image}} style={{flex:1,width:600}} />}
//<StatusBar hidden={true} />
//<StatusBar style="auto" />