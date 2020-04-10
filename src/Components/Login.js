import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Firebase from '../config/firebase'
export default class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }

  state = {
    email: '',
    password: '',
    eye: true,
    eyeoff: false,
    pass: true
  }

  eye_funnction = () => {
    if (this.state.eye == true) {
      this.setState({
        eye: false,
        eyeoff: true,
        pass: false
      })
    }
    else {
      this.setState({
        eye: true,
        eyeoff: false,
        pass: true
      })
    }
  }

  logInUser = () => {
    if (this.state.email == '' || this.state.password == '') {
      Alert.alert("Login Failed", "Fill in all the details")
    }
    else {
      Firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( async(cred) => {
          let userId = cred.user.uid;
          await AsyncStorage.setItem("userId",userId);
          this.props.navigation.navigate('home');
        })
        .catch((error) => Alert.alert("Login Failed", error.message));
        
    }
  }


  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <ScrollView>
          <View style={styles.container}>
            <View flexDirection="row" style={{ paddingLeft: 29 }}>
              <Image style={{ width: 190, height: 173, marginTop: 5 }} source={require('../Images/logo1.png')} />
            </View>
            <Text style={styles.logoText}>Health-Care</Text>
            <Text style={styles.QuoteText}>In Love With Life</Text>
            <TextInput style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              selectionColor="#232f34"
              keyboardType='email-address'
              onChangeText={email => this.setState({ email })}
            />
            <View flexDirection='row'>
              <TextInput style={styles.inputBox1}
                placeholder="Password"
                selectionColor="#232f34"
                secureTextEntry={this.state.pass}
                keyboardType="default"
                placeholderTextColor="#ffffff"
                onChangeText={password => this.setState({ password })}
              />
              <Text>   </Text>
              <TouchableOpacity style={styles.buttonEye} onPress={this.eye_funnction}>
                {
                  this.state.eye ? <Icon name='md-eye' size={30} color='#3498db' /> : null
                }
                {
                  this.state.eyeoff ? <Icon name='md-eye-off' size={30} color='#e74c3c' /> : null
                }
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('otp')}>
              <Text style={{ fontSize: 17, color: '#e74c3c', marginBottom: 30 }}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
              onPress={() => this.logInUser()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
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
  button: {
    width: 300,
    backgroundColor: '#232f34',
    borderRadius: 25,
    marginVertical: 0,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ffffff',
    marginTop: 50
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
    color: '#ffffff'
  },
  inputBox1: {
    width: 240,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ffffff',
    marginVertical: 20
  },
  buttonEye: {
    width: 49,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 9,
    paddingHorizontal: 11
  }
});