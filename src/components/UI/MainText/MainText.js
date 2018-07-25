import React from 'react';
import { StyleSheet, Text } from 'react-native';


const mainText = props => (
  <Text {...props} style={styles.mainText}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Arial',
    color: '#222',
    backgroundColor: 'transparent'
  }
});

export default mainText;
