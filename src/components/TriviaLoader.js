import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Button from './Button';
import { scale, moderateScale, verticalScale} from '../Scaling';

const defaultProps = {
  error: false,
  loading: false,
  loadingText: 'Loading....',
  onRetryPressed: () => {}
};

// component to load questions from OTD API.
// On error, button to retry should be displayed.

class TriviaLoader extends React.Component {

  render() {
    const { loading, error, loadingText, onRetryPressed} = this.props;

    return (
      <View style={styles.container}>

          {(loading || error) ? (
            (loading) ? (
              <View style={styles.loaderContainer}>

                <Text style={styles.loaderText}>{loadingText}</Text>
              </View>
            ) : (
              <View style={styles.loaderContainer}>
                <Text style={styles.errorText}>Connection Error</Text>
                <Text style={styles.errorDescription}>Please check your Internet connection and try again...</Text>
                <Button onPress={onRetryPressed}>
                  Retry
                </Button>
              </View>
            )
          ) : (
            this.props.children
          )}
      </View>
    );
  }
}

// Styling for loading screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  loaderContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingTop: 0,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0000FF',
  },
  loaderText: {
    fontSize: moderateScale(30),
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: '#000000'
  },
  errorText: {
    fontSize: moderateScale(30),
    color: '#FF4423',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginBottom: scale(10),
  },
  errorDescription: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginBottom: 0,
  },
  errorIssue: {
    marginBottom: 0,
    fontStyle: 'italic',
  },
});

TriviaLoader.defaultProps = defaultProps;
export default TriviaLoader;
