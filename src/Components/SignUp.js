import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import Firebase from '../config/firebase'
export default class SignUp extends React.Component {
  static navigationOptions = {
    fontWeight: 'bold',
    title: 'SignUp',
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }
  state = {
    userRule: false,
    passwordRule: false,
    emailText: '',
    passwordText: '',
    eye: true,
    eyeoff: false,
    pass: true
  }

  password_Rules = () => {
    if (this.state.passwordRule == false) {
      this.setState({ passwordRule: true })
    }
  }

  emailValidate = () => {
    var v = this.state.emailText
    if (v != '') {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(v) != true) {
        Alert.alert("Enter Correct E-Mail Address.");
      }
    }
  }

  passwordValidate = () => {
    if (this.state.passwordRule == true) {
      this.setState({ passwordRule: false })
    }
    var v = this.state.passwordText
    if (v != '') {
      var regex = /^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/g;
      if (regex.test(v) != true) {
        Alert.alert("Enter Appropriate Password.");
      }
    }

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

  finalSubmission = () => {

    if (this.state.emailText == '' || this.state.passwordText == '') {
      Alert.alert("SignUp Failed", "Fill all the details")
    }
    else {

      Firebase.auth().createUserWithEmailAndPassword(this.state.emailText, this.state.passwordText)
        .then((cred) => {
          Firebase.firestore().collection("Users").doc(cred.user.uid).set({
            Name: this.props.navigation.state.params.user.name,
            Email: this.state.emailText,
            Height: this.props.navigation.state.params.user.height,
            Weight: this.props.navigation.state.params.user.weight,
            Gender: this.props.navigation.state.params.user.gender,
            BDate: this.props.navigation.state.params.user.date,
            Points: 0
          })
            .then(async () => {
              console.log("Document added");
              let userId = cred.user.uid;
              await AsyncStorage.setItem("userId", userId)
            }

            )
            .catch((error) =>
              console.error("Error adding document: ", error)
            );
          this.props.navigation.navigate('home')
        })
        .catch((error) => Alert.alert("SingUp Failed", error.message));

    }
  };

  render() {
    console.disableYellowBox = true;
    return (

      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <ScrollView>
          <View style={styles.container}>
            <View style={{ paddingLeft: 30 }}>
              <Image style={{ width: 190, height: 173 }} source={require('../Images/logo1.png')} />
            </View>
            <Text style={styles.logoText}>Health-Care</Text>
            <Text style={styles.QuoteText}>In Love With Life</Text>

            <TextInput style={styles.inputBox}
              placeholder="Enter your e-mail address"
              selectionColor="#232f34"
              keyboardType="email-address"
              placeholderTextColor="#ffffff"
              onChangeText={emailText => this.setState({ emailText })}
              onBlur={this.emailValidate}
            />

            <View flexDirection='row'>
              <TextInput style={styles.inputBox1}
                placeholder="Create Password"
                selectionColor="#232f34"
                secureTextEntry={this.state.pass}
                keyboardType="default"
                placeholderTextColor="#ffffff"
                onChangeText={passwordText => this.setState({ passwordText })}
                onFocus={this.password_Rules}
                onBlur={this.passwordValidate}
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

            {
              this.state.passwordRule ? <Text style={{ paddingVertical: 0, fontSize: 17, color: '#e74c3c' }}>Password should be 5-10 charecter long only.</Text> : null
            }
            {
              this.state.passwordRule ? <Text style={{ paddingVertical: 0, fontSize: 17, color: '#e74c3c' }}>It should contain atleast one special charecter</Text> : null
            }
            {
              this.state.passwordRule ? <Text style={{ paddingVertical: 0, fontSize: 17, color: '#e74c3c' }}>One UpperCase and One LoweCase Charecter.</Text> : null
            }
            {
              this.state.passwordRule ? <Text style={{ paddingVertical: 0, fontSize: 17, color: '#e74c3c' }}>It should not contain a space in between.</Text> : null
            }
            <TouchableOpacity style={styles.button}
              onPress={this.finalSubmission}>
              <Text style={styles.buttonText}>SignUp</Text>
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
    marginTop: 90,
    paddingVertical: 13,
  },
  buttonEye: {
    width: 49,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 9,
    paddingHorizontal: 11
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  },
  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  QuoteText: {
    fontSize: 19,
    color: '#ffffff'
  },
  logoText: {
    fontSize: 35,
    color: '#2ecc71',
    fontWeight: 'bold',
    paddingVertical: 10
  },
  inputBox: {
    width: 320,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#ffffff',
    marginTop: 30
  },
  inputBox1: {
    width: 260,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#ffffff',
    marginVertical: 10
  }
});
