import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Splash extends React.Component {
  static navigationOptions = {
    header: null,
  };

  UNSAFE_componentWillMount = () => {
    setTimeout(async () => {
      let userId = await AsyncStorage.getItem("userId")
      if (userId) {
        this.props.navigation.navigate('home')
      }
      else {
        this.props.navigation.navigate('main')
      }
    }, 2000)
  }

  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <View style={styles.container}>
          <StatusBar backgroundColor="#232f34" barStyle="light-content" />
          <View flexDirection="row" style={{ paddingLeft: 29 }}>
            <Image style={{ width: 190, height: 173 }} source={require('../Images/logo1.png')} />
          </View>
          <Text style={styles.logoText}>Health-Care</Text>
          <Text style={styles.QuoteText}>In Love With Life</Text>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    marginVertical: 5,
    fontSize: 39,
    color: '#2ecc71',
    fontWeight: 'bold'
  },
  QuoteText: {
    marginVertical: 0,
    fontSize: 20,
    color: '#ffffff'
  }
});