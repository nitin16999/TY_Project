import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../config/firebase'

export default class Otp extends React.Component {
  static navigationOptions = {
    fontWeight: 'bold',
    title: 'Reset Password',
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }

  state = {
    emailText: ''
  }

  emailValidate = () => {
    var v = this.state.emailText
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (v != '') {
      if (regex.test(v) != true) {
        Alert.alert("Enter Correct E-Mail Address."
        );
      }
    }
  };

  otpHandler = () => {
    if (this.state.emailText == '') {
      Alert.alert('Fill in all the details');
    }
    else {
      var v = this.state.emailText
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (v != '') {
        if (regex.test(v) != true) {
          Alert.alert("Enter Correct E-Mail Address."
          );
        }
        else {
          Firebase.auth().sendPasswordResetEmail(this.state.emailText).then(() => {
            Alert.alert('Reset Password link has been sent to you e-mail account');
          })
            .catch((error) => Alert.alert("Failed", error.message))
        }
      }
    }
  };

  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <View style={styles.container}>
          <StatusBar backgroundColor="#232f34" barStyle="light-content" />
          <View flexDirection="row" style={{ paddingLeft: 25 }}>
            <Image style={{ width: 190, height: 173 }} source={require('../Images/logo1.png')} />
          </View>
          <Text style={styles.logoText}>Health-Care</Text>
          <Text style={styles.QuoteText}>In Love With Life</Text>
          <TextInput style={styles.inputBox}
            placeholder="Enter Registered e-mail address"
            placeholderTextColor="#ffffff"
            selectionColor="#232f34"
            keyboardType="email-address"
            onChangeText={emailText => this.setState({ emailText })}
          />
          <TouchableOpacity style={styles.button} onPress={this.otpHandler}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: '#ffffff', paddingHorizontal: 25, paddingTop: 90 }}>Note: Reset Password Link Will be mailed to your registered e-mail address.</Text>
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
    fontSize: 35,
    color: '#2ecc71',
    fontWeight: 'bold'
  },
  QuoteText: {
    marginVertical: 0,
    fontSize: 19,
    color: '#ffffff',
    paddingBottom: 40
  },
  button: {
    width: 300,
    backgroundColor: '#232f34',
    borderRadius: 25,
    marginVertical: 12,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ffffff',
    marginVertical: 5
  }
});