import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#264653',
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
  subHead: {
    color: '#fff',
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 15,
    marginHorizontal: 20,
    marginTop: 30,
  },
  homeSubHead: {
    color: '#fff',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    marginTop: 40,
  },
  challenges: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  buttonLayout: {
    fontFamily: 'Montserrat_200ExtraLight',
    backgroundColor: "#2A9D8F",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  buttonRow: {
    fontFamily: 'Montserrat_200ExtraLight',
    marginVertical: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20, 
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 50 
  },
  buttonText: {
    fontSize: 13,
    color: "#fff",
    fontFamily: 'Montserrat_400Regular',
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  betaLayout: {
    fontFamily: 'Montserrat_200ExtraLight',
    marginVertical: 5,
    //marginHorizontal: 10,
    flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  deleteStyle: {
    marginTop: 10,
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 10,
    position: 'relative',
    marginLeft: 10,
    backgroundColor: "#E76F51"
  },
  betaNameStyle: {
    color: '#fff',
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 30,
  },
  betaImage: {
    flex: 1,
    marginTop: 30, 
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  circleShape: {
    backgroundColor: 'rgba(231, 111, 81, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(231, 111, 81, 1)',
  },
  label: {
    position: 'absolute',
    marginHorizontal: 20, 
    marginTop: 50,
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },

  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(windowWidth * 0.4) }, 
                  { translateY: -90 }],
      height: 180,
      width: windowWidth * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
  },
  textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
  },
  
})


export { styles };