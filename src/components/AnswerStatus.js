import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { scale, moderateScale, verticalScale} from '../Scaling';

const propTypes = {
  type: PropTypes.oneOf(['correct', 'incorrect']).isRequired,
};

class AnswerStatus extends React.Component {
  constructor(props){
		super(props);
  }

// render result according to prop type
  render() {
    let statusMessage;
    let statusStyle;
    switch(this.props.type) {
      case 'correct':
        statusMessage = 'Correct';
        statusStyle = styles.correctText;
        break;
      case 'incorrect':
        statusMessage = 'Incorrect';
        statusStyle = styles.errorText;
        break;
    }

    return (
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, statusStyle]}>{statusMessage}</Text>
      </View>
    );
  }
}

// styliing for answer
const styles = StyleSheet.create({
  statusContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#050A30',
  },
  statusAnimation: {
    width: scale(300),
    height: scale(300)
  },
  statusText: {
    fontSize: moderateScale(40),
    textShadowRadius: 10,
    marginTop: moderateScale(-60)
  },
  correctText: {
    color: '#00C871'
  },
  errorText: {
    color: '#FF1122'
  },
  timeoutText: {
    color: '#FFAA38'
  },
});

AnswerStatus.propTypes = propTypes;
export default AnswerStatus;
