import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {p} from '../../common/normalize';
import {colors} from '../../common/colors';
import UtilService from '../../common/utils';

export function ResponsesAtom(props) {
  const {item} = props;
  if (item.responses && item.responses.length > 0) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: item.responses[0] && item.responses[0].avatar}}
          style={[
            styles.respondImg,
            {marginLeft: 0, borderColor: UtilService.acceptColor(item)},
          ]}
        />
        {item.responses[1] && (
          <Image
            source={{uri: item.responses[1].avatar}}
            style={[
              styles.respondImg,
              {borderColor: UtilService.acceptColor(item)},
            ]}
          />
        )}
        {item.responses[2] && (
          <Image
            source={{uri: item.responses[2].avatar}}
            style={[
              styles.respondImg,
              {borderColor: UtilService.acceptColor(item)},
            ]}
          />
        )}
        <Text style={styles.text}>
          {item.responses.length}{' '}
          {item.responses.length === 1 ? 'Response' : 'Responses'}
        </Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 30,
    alignItems: 'center',
    marginTop: p(16),
  },
  respondImg: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: -8,
    backgroundColor: colors.WHITE,
  },
  text: {
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    color: colors.WHITE,
    marginLeft: 5,
    fontSize: 14,
    lineHeight: 18,
  },
});
