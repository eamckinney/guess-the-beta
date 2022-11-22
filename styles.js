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
  buttonLayout: {
    fontFamily: 'Montserrat_200ExtraLight',
    backgroundColor: "#2A9D8F",
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
})


export { styles };