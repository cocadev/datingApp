import React from 'react';
import { SafeAreaView } from 'react-native';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './styles';
import Tab from './Tab';

export const tabBarBuilder = (tabIcons, appStyles) => {
  return (props) => {
    const { navigation } = props;
    const styles = useDynamicStyleSheet(dynamicStyles(appStyles));
    return (
      <SafeAreaView style={styles.tabBarContainer}>
        {navigation.state.routes.map((route, index) => {
          return (
            <Tab
              key={index + ''}
              route={route}
              tabIcons={tabIcons}
              appStyles={appStyles}
              focus={navigation.state.index === index}
              onPress={() => navigation.navigate(route.routeName)}
            />
          );
        })}
      </SafeAreaView>
    );
  }
}


export default tabBarBuilder;
