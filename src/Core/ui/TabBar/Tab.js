import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';

function Tab({ route, onPress, focus, tabIcons, appStyles }) {
  const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
  return (
    <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
      <Image
        source={
          focus
            ? tabIcons[route.routeName].focus
            : tabIcons[route.routeName].unFocus
        }
        style={[
          styles.tabIcon,
          focus ? styles.focusTintColor : styles.unFocusTintColor,
        ]}
      />
    </TouchableOpacity>
  );
}

export default Tab;
