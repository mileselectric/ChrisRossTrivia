import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../Button';
import { startGameSelection } from '../../actions';
import { scale, moderateScale, verticalScale} from '../../Scaling';

class GameOver extends React.Component {

  constructor(props){
		super(props);
	}

  render() {

    const {
      elapsedTime,
      scorePercent,
      selectedCategory,
      selectedDifficulty,
      startGameSelection,
      totalQuestionsNumber,
      totalScore,
    } = this.props;

    // Change text color according to score.
    let scoreColor;
    let message;
    if(scorePercent >= 0.8) {
      scoreColor = '#14AB00';
    }
    else if(scorePercent > 0.5) {
      scoreColor = '#8f61f9';
    }
    else {
      scoreColor = '#FF2020';
    }

    return (
      <View style={styles.container}>

          <View style={styles.gameOverData}>
            <ScrollView>

          <View style={styles.gameOverInternal}>
              <Text style={styles.gameOverTitle}>Quiz Results</Text>
              <Text style={[styles.gameScoreText, { color: scoreColor }]}>Score: {totalScore} of {totalQuestionsNumber}</Text>
              <Text style={styles.gameStatusText}>Time Taken: {elapsedTime} seconds</Text>
              <Button onPress={startGameSelection}>
                Play Again
              </Button>
            </View>
            </ScrollView>
            </View>
      </View>
    )
  }
}

// Styling for score view
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameOverData: {
    padding: scale(16),
    marginTop: scale(32),
    marginBottom: scale(32),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverInternal: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverTitle: {
    color: '#000000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: scale(10),
    fontSize: moderateScale(50),
    zIndex: 9999,
    textAlign: 'center',
  },
  gameScoreText: {
    fontWeight: "900",
    fontSize: moderateScale(32),
    marginTop: scale(5),
    marginBottom: scale(5),
  },
  gameStatusText: {
    fontSize: moderateScale(24),
    fontWeight: "900",
    color: '#8f61f9',
    marginTop: 2,
    marginBottom: 2,
  },
});

const mapStateToProps = ({ trivia }) => {
  const { categories, endTime, questions, startTime, selectedCategoryId, selectedDifficulty, totalScore } = trivia;

  // Calculate time taken for quiz
  const elapsedTime = Math.round((endTime - startTime) / 1000);
  const totalQuestionsNumber = questions.length;
  const scorePercent = totalScore / totalQuestionsNumber;
  return {
    selectedCategory: categories.filter(category => category.value === selectedCategoryId)[0].label,
    elapsedTime,
    scorePercent,
    selectedDifficulty,
    totalQuestionsNumber,
    totalScore
  };
};

export default connect(mapStateToProps, { startGameSelection })(GameOver);
