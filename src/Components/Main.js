import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigationFocus } from 'react-navigation';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Health-Care',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }

  handleBackButton = () => {
    if (this.props.isFocused) {
      Alert.alert(
        'Exit App',
        'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'Ok',
          onPress: () => BackHandler.exitApp()
        },], {
        cancelable: false
      }
      )
      return true;
    }
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <View style={styles.container}>
          <View flexDirection="row" style={{ paddingLeft: 29 }}>
            <Image style={{ width: 190, height: 173 }} source={require('../Images/logo1.png')} />
          </View>
          <Text style={styles.logoText}>Health-Care</Text>
          <Text style={styles.QuoteText}>In Love With Life</Text>
          <Text style={{ paddingTop: 50 }}></Text>
          <TouchableOpacity style={styles.button1}
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.buttonText1}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.Text}>Don't have an Account yet?</Text>
          <TouchableOpacity style={styles.button2}
            onPress={() => this.props.navigation.navigate('register')}>
            <Text style={styles.buttonText2}>SignUP</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 35,
    color: '#2ecc71',
    fontWeight: 'bold',
    paddingTop: 10
  },
  button1: {
    width: 300,
    backgroundColor: '#232f34',
    borderRadius: 25,
    marginTop: 50,
    paddingVertical: 12,
    marginBottom: 1
  },
  button2: {
    width: 300,
    backgroundColor: '#232f34',
    borderRadius: 25,
    marginVertical: 12,
    paddingVertical: 11
  },
  buttonText1: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  },
  buttonText2: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center'
  },
  QuoteText: {
    fontSize: 19,
    color: '#ffffff'
  },
  Text: {
    fontSize: 15,
    color: '#ffffff',
    marginTop: 25
  }
});

export default withNavigationFocus(Main);
