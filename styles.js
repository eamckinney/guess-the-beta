import { StyleSheet } from 'react-native';

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
    zIndex: 100
  },
  subHead: {
    color: '#fff',
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 30,
    zIndex: 100,
  },

  TextForChallenges: {

    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 15,
    color: '#fff',
    zIndex: 100,

  },

  textBeforeWelcomeButtons: {
    width: '100%',
    height: 105,
    zIndex: 100,
  },


  buttonRowSpacer: {
    
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 'auto',
    paddingHorizontal: 0,
    zIndex: 100,

  },
  bodyText: {
    color: '#fff',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
  },
  buttonLayout: {
    fontFamily: 'Montserrat_200ExtraLight',
    backgroundColor: "#ffffff",
    opacity: 0.12,
    borderRadius: 3,
    height: 80,
    width: 80,
    zIndex: 100,
  },
  buttonRow: {
    fontFamily: 'Montserrat_200ExtraLight',
    marginVertical: 15,
    marginHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20, 
    borderRadius: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 50,
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
  
})


export { styles };