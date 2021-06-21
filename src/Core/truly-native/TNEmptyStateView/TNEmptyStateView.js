import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

const TNEmptyStateView = props => {
  const styles = new useDynamicStyleSheet(dynamicStyles(props.appStyles));
  const { emptyStateConfig } = props;
  return (
    <View style={[props.style]}>
      <Text style={styles.title}>{emptyStateConfig.title}</Text>
      <Text style={styles.description}>{emptyStateConfig.description}</Text>
      {emptyStateConfig.buttonName && emptyStateConfig.buttonName.length > 0 && (
        <TouchableOpacity onPress={emptyStateConfig.onPress} style={styles.buttonContainer}>
          <Text style={styles.buttonName}>{emptyStateConfig.buttonName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TNEmptyStateView;
