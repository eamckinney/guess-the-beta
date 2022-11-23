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
  },
  subHead: {
    color: '#fff',
    fontFamily: 'Montserrat_200ExtraLight',
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 30,
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
    marginVertical: 10,
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
  betaImage: {
    flex: 1,
    marginTop: 30, 
    width: '100%', 
    height: '100%', 
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  circleShape: {
    //width: 150,
    //height: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#FF9800',
  },
})


export { styles };