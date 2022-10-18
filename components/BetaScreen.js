import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BetaScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add betas here!</Text>

        <Button
          title="Go back hooooome"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BetaScreen;