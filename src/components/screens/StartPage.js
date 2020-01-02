import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Button from '../Button';
import TriviaLoader from '../TriviaLoader';
import * as actions from '../../actions';
import { scale, moderateScale, verticalScale} from '../../Scaling';

// variables available in the OTD API
const DIFFICULTY_OPTIONS = ["Mixed", "Easy", "Medium", "Hard"];
const NUMBER_OF_QUESTIONS = ["10", "20", "30", "40", "50"];

class StartPage extends React.Component {
  constructor() {
    super()

    // set API to use "Any" category, random difficulty and 10 questions.

    this.state = {
      selectedCategoryId: -1,
      selectedDifficulty: 0,
      selectedQuestion: 0,
    }
  }

  componentWillMount() {
    this.props.triviaCategoryFetch();
  }


  handleStartGame = () => {
    const { selectedCategoryId, selectedDifficulty, selectedQuestion } = this.state;
    this.props.startGame(
      selectedCategoryId,
      DIFFICULTY_OPTIONS[selectedDifficulty],
      NUMBER_OF_QUESTIONS[selectedQuestion]
    );
  }

  render() {
    return (
      <TriviaLoader
        loading={this.props.loading}
        error={this.props.error}
        loadingText="Loading..."
        onRetryPressed={() => this.props.startGameSelection()}
      >
        <View style={styles.container}>
          <View style={styles.gameTitleContainer}>
            <Text style={styles.gameTitle}>Lucky Trivia</Text>
          </View>

          <Button onPress={this.handleStartGame}>
            Start Quiz
            </Button>
        </View>
      </TriviaLoader>
    );
  }
}

// styling for start page
const styles = StyleSheet.create({
  gameTitle: {
    color: '#000000',
    fontSize: moderateScale(60)
  },
  gameTitleContainer: {
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#ADD8E6',
    width: '100%',
    height: '100%'
  },
});


const mapStateToProps = ({ trivia }) => {
  const { error, loading, categories } = trivia;

  return {
    error,
    loading,
    categories
  };
};

export default connect(mapStateToProps,
  actions
)(StartPage);
