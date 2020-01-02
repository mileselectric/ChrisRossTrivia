import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import QuestionOptionItem from './QuestionOptionItem';
import { scale, moderateScale, verticalScale} from '../Scaling';

// Question component

const propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['boolean', 'multiple']).isRequired,
  difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const defaultProps = {
  onItemSelected: () => { },
};

function Question(props) {
  return (
    <View style={styles.questionDataContainer}>

      <View style={styles.questionData}>

        <Text style={styles.questionDescription}>{props.question}</Text>

      </View>

      <FlatList
          style={styles.questionOptions}
          data={props.options}
          contentContainerStyle={styles.questionOptionsContainer}
          renderItem={({ item }) => (
            <QuestionOptionItem
              optionDescription={item}
              onPressItem={props.onItemSelected}
            />
          )}
          keyExtractor={(item, index) => `${index}-${item}`}
          onPressItem={props.onItemSelected}
          scrollEnabled={true}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  questionDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(16),
    marginRight: scale(16),
    backgroundColor: '#EEEAF7',
  },

  questionData: {
    padding: scale(16),
    marginTop: scale(32),
    marginBottom: scale(32),
    alignSelf: 'stretch',
    maxHeight: verticalScale(280),
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#ffffff',
    justifyContent: 'center',
    backgroundColor: '#ADD8E6',
  },

  questionDescription: {
    color: '#000',
    fontSize: moderateScale(20),
    textAlign: 'center',
  },

  questionOptions: {
    width: '100%',
  },
  questionOptionsContainer: {
    marginTop: 0,
  }
});

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;
export default Question;
