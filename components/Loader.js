import React, { useCallback, useEffect, useState } from 'react';
import {StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';

const loading = () => {
  return (
      <View
          style={{
              flex: 1,
              backgroundColor: '#ffffff',
          }}
      >
          <LottieView
              source={require('../assets/97930-loading.json')}
              autoPlay
              loop={true}
              speed={1}
          />
      </View>
  );
};

export default loading;