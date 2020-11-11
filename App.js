import 'react-native-gesture-handler';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './src/Components/Main';
import Splash from './src/Components/Splash';
import Login from './src/Components/Login';
import SignUp from './src/Components/SignUp';
import Home from './src/Components/Home';
import Otp from './src/Components/Otp';
import Register from './src/Components/Register';

const AppNavigator = createStackNavigator(
  {
    splash: Splash,
    main: Main,
    login: Login,
    otp: Otp,
    signup: SignUp,
    home: Home,
    register: Register,
  },
  {
    initialRouteName: 'splash'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}