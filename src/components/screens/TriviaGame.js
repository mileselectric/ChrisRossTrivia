import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import AnswerStatus from '../AnswerStatus';
import Button from '../Button';
import Question from '../Question';
import TriviaLoader from '../TriviaLoader';
import * as actions from '../../actions';
import { capitalizeFirstLetter } from '../../Utils';
import { scale, moderateScale } from '../../Scaling';

class TriviaGame extends React.Component {

  constructor(props){
		super(props);
    // load default state
		this.state = {
      answerStatus: false,
      answerType: 'correct',
		};
  }

  // using setting pushed from StartPage, triviaFetch uses app api to pull questions.
  componentWillMount() {
    const { selectedCategoryId, selectedDifficulty, numberOfQuestions } = this.props;
    this.props.triviaFetch(
      selectedCategoryId,
      selectedDifficulty,
      numberOfQuestions,
    );
  }

  // function to process selection of answer
  handleAnswerSelection = (questionOption) => {

    if(this.state.answerStatus) return;
    const {
      currentQuestionIndex,
      currentQuestion,
      questions,
      nextQuestion,
      totalScore
    } = this.props;

    // handles correct or incorrect answers.

    const app = this;
    const type = (questionOption === currentQuestion.correct_answer) ? 'correct' : 'incorrect';

    // updates answerType to correct or incorrect
    this.setState({answerStatus: true, answerType: type});
    setTimeout(function(){
      app.setState({answerStatus: false});
      nextQuestion(
        questionOption,
        currentQuestionIndex,
        questions,
        totalScore
      );
    },
    1500);
  };

  render() {
    const {
      currentQuestionNumber,
      currentQuestion,
      questions,
      totalQuestionsSize,
    } = this.props;

    return (
      <TriviaLoader
          loading={this.props.loading}
          error={this.props.error}
          loadingText="Be ready to React!"
          onRetryPressed={() => this.props.startGame()}
        >
        {(this.state.answerStatus) &&
        <View style={styles.answerStatus}>
          <AnswerStatus
            type={this.state.answerType}
          />
        </View>
        }
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Question {currentQuestionNumber}</Text>
            </View>
            <Question
              question={currentQuestion.question}
              options={currentQuestion.options}
              type={currentQuestion.type}
              difficulty={currentQuestion.difficulty}
              category={currentQuestion.category}
              onItemSelected={this.handleAnswerSelection}
            />
          </View>
        </TriviaLoader>
    );
  }
}

// styling for quiz view
const styles = StyleSheet.create({
  noDataContainer: {
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
    backgroundColor: '#7EC8E3',
  },
  answerStatus: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999
  },
  noDataText: {
    fontSize: moderateScale(20),
    padding: scale(10),
    textAlign: 'justify',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(24),
    paddingLeft: scale(24),
    paddingTop: scale(12),
    paddingBottom: scale(12),
    backgroundColor: '#000000',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    margin: scale(8),
    marginTop: scale(36),
  },
  headerTitle: {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: moderateScale(28),
    fontWeight: '900',
  },
  categoryText: {
    fontWeight: '300',
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: '900',
  },
});

const mapStateToProps = ({ trivia }) => {
  const {
    categories,
    currentQuestionIndex,
    error,
    loading,
    questions,
    totalScore,
    selectedCategoryId,
    selectedDifficulty,
    numberOfQuestions
  } = trivia;

  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionNumber: currentQuestionIndex + 1,
    selectedCategory: categories.filter(category => category.value === selectedCategoryId)[0].label,
    totalQuestionsSize: questions.length,
    currentQuestionIndex,
    error,
    loading,
    numberOfQuestions,
    questions,
    totalScore,
    selectedCategoryId,
    selectedDifficulty,
  };
};

export default connect(mapStateToProps,
  actions
)(TriviaGame);
