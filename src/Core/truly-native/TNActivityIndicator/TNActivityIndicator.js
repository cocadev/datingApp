import React from 'react';
import { View, Text } from 'react-native';
import { UIActivityIndicator } from 'react-native-indicators';
import styles from './styles';

const TNActivityIndicator = props => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <UIActivityIndicator color="#f5f5f5" size={30} animationDuration={400} />
        {props.text && props.text.length > 1 && <Text style={styles.text}>{props.text}</Text>}
      </View>
    </View>
  );
};

export default TNActivityIndicator;
