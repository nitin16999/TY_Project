import React from 'react';
import { BackHandler } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from './Profile';
import ActivityScreen from './Activity';
import EventScreen from './Event';
import DietScreen from './Diet';
import Icon from 'react-native-vector-icons/Ionicons';
const AppNavigator = createMaterialTopTabNavigator(
  {
    activity: {
      screen: ActivityScreen,
      navigationOptions: {
        tabBarLabel: 'Activity     ',
        tabBarIcon: () => (
          <Icon name='ios-walk' size={28} color='#e74c3c' />//red color
        )
      },

    },
    diet: {
      screen: DietScreen,
      navigationOptions: {
        tabBarLabel: 'Diet   ',
        tabBarIcon: () => (
          <Icon name='ios-restaurant' size={28} color='#2ecc71' />//green color
        )
      },
    },
    event: {
      screen: EventScreen,
      navigationOptions: {
        tabBarLabel: 'Event',
        tabBarIcon: () => (
          <Icon name='ios-list-box' size={28} color='#ffffff' />//white color
        )
      },
    },
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile ',
        tabBarIcon: () => (
          <Icon name='ios-person' size={28} color='#3498db' />// blue color
        )
      },
    },
  },
  {
    initialRouteName: 'activity',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#232f34',
      indicatorStyle: {
        height: 0
      },
      labelStyle: {
        fontSize: 11,
        fontWeight: 'bold'
      },
      showIcon: true,
      style: {
        backgroundColor: '#232f34',
      }
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);



export default class Home extends React.Component {
  static navigationOptions = {
    fontWeight: 'bold',
    title: 'Health-Care',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
  }
  render() {
    return (
      <AppContainer />
    );
  }
}