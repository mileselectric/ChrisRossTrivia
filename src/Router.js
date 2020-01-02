import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import StartPage from './components/screens/StartPage';
import TriviaGame from './components/screens/TriviaGame';
import GameOver from './components/screens/GameOver';

// App router to show the 3 views: start page / trivia / end of quiz

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="main" hideNavBar={true}>
        <Scene key="startPage" component={StartPage} initial  />
        <Scene key="triviaGame" component={TriviaGame} />
        <Scene key="gameOver" component={GameOver} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
