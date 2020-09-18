import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import Divider from 'react-native-divider'
import LinearGradient from 'react-native-linear-gradient'
import { Radio } from 'native-base'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Splash extends React.Component {

  static navigationOptions = {
    fontWeight: 'bold',
    title: 'SignUp',
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }

  state = {
    male: false,
    female: false,
    isDateTimePickerVisible: false,
    chosenDate: '',
    status: true,
    TextInputName: '',
    TextInputHeight: '',
    TextInputWeight: '',
    Gender: '',
  }

  malePressed() {
    this.setState({ male: true, female: false, Gender: 'Male' })
  }
  femalePressed() {
    this.setState({ male: false, female: true, Gender: 'Female' })
  }

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }
  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }
  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    this.setState({
      chosenDate: (moment(date).format('YYYY/MM/DD')),
    })
    if (this.state.status == true) {
      this.setState({ status: false })
    }
  };

  nameValidate = () => {
    var v = this.state.TextInputName
    var regex = /^[A-Za-z ]+$/;  // /[0-9`~!@#$%^&*()-_=+,.<>/?;:'"[\]\\|{}]+$/g;
    if (regex.test(v) != true) {
      setTimeout(function () {
        Alert.alert("Enter Correct Name.");
      }, 1000);
    }
  }

  heightValidate = () => {
    var v = this.state.TextInputHeight
    var regex = /[0-9.]+$/;
    if (regex.test(v) != true) {
      Alert.alert("Enter Correct Height Value.");
    }
  }

  weightValidate = () => {
    var v = this.state.TextInputWeight
    var regex = /[0-9.]+$/;
    if (regex.test(v) != true) {
      Alert.alert("Enter Correct Weight Value.");
    }
  }

  final_Submission = () => {
    if (this.state.TextInputName != '') {
      if (this.state.TextInputHeight != '') {
        if (this.state.TextInputWeight != '') {
          if (this.state.male == true || this.state.female == true) {
            if (this.state.status == false) {
              let user = {
                name: this.state.TextInputName,
                height: this.state.TextInputHeight,
                weight: this.state.TextInputWeight,
                gender: this.state.Gender,
                date: this.state.chosenDate
              }
              this.props.navigation.navigate('signup', { user })
            }
            else {
              Alert.alert("Fill in all the details.");
            }
          }
          else {
            Alert.alert("Fill in all the details.");
          }
        }
        else {
          Alert.alert("Fill in all the details.");
        }
      }
      else {
        Alert.alert("Fill in all the details.");
      }
    }
    else {
      Alert.alert("Fill in all the details.");
    }
  };

  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >

        <ScrollView >
          <Text style={styles.heading}>Enter Your Details</Text>
          <View style={styles.container}>

            <Divider>
              <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '600' }}>Name</Text>
            </Divider>
            <View style={styles.container1}>
              <TextInput style={styles.inputBox}
                placeholder="Here.."
                selectionColor="#232f34"
                keyboardType="default"
                placeholderTextColor="#ffffff"
                onChangeText={TextInputName => this.setState({ TextInputName })}
                onBlur={this.nameValidate}
              />
            </View>

            <Text></Text>

            <Divider>
              <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '600' }}>Height (cm.)</Text>
            </Divider>
            <View style={styles.container1}>
              <TextInput style={styles.inputBox}
                placeholder="Here.."
                selectionColor="#232f34"
                keyboardType="numeric"
                placeholderTextColor="#ffffff"
                onChangeText={TextInputHeight => this.setState({ TextInputHeight })}
                onBlur={this.heightValidate}
              />
            </View>

            <Text></Text>

            <Divider>
              <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '600' }}>Weight (kg.)</Text>
            </Divider>
            <View style={styles.container1}>
              <TextInput style={styles.inputBox}
                placeholder="Here.."
                selectionColor="#232f34"
                keyboardType='numeric'
                placeholderTextColor="#ffffff"
                onChangeText={TextInputWeight => this.setState({ TextInputWeight })}
                onBlur={this.weightValidate}
              />
            </View>

            <Text></Text>

            <Divider>
              <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '600' }}>Select Gender</Text>
            </Divider>
            <View style={{ flexDirection: 'row' }}>
              <Text>    </Text>
              <Radio color='#fff' selectedColor='#2ecc71' onPress={() => this.malePressed()} selected={this.state.male} style={{ paddingVertical: 19 }}></Radio>
              <Text style={{ paddingTop: 19, paddingHorizontal: 10, fontSize: 19, fontWeight: '900', color: '#fff' }}>Male</Text>
              <Text>                    </Text>
              <Radio color='#fff' selectedColor='#2ecc71' onPress={() => this.femalePressed()} selected={this.state.female} style={{ paddingVertical: 19 }}></Radio>
              <Text style={{ paddingTop: 19, paddingHorizontal: 10, fontSize: 19, fontWeight: '900', color: '#fff' }}>Female</Text>
            </View>


            <Divider>
              <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '600' }}>Select Birth Date</Text>
            </Divider>
            <View style={{ paddingHorizontal: 28 }}>
              <TouchableOpacity style={styles.inputBox1}
                onPress={this._showDateTimePicker}
              >
                <View flexDirection='row'>

                  {
                    this.state.status ? <Text style={{ paddingVertical: 15, fontSize: 15, color: '#ffffff' }}>From Here..</Text> : null
                  }
                  <Text style={{ paddingVertical: 12, fontSize: 17, color: '#ffffff' }}>{this.state.chosenDate}</Text>
                  <Icon style={{ paddingVertical: 9, paddingHorizontal: 10 }} name='ios-calendar' size={30} color='#ffffff' />

                </View>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                maximumDate={Date.parse((moment().format('MM/DD/YYYY')))}
              />
            </View>

            <View style={{ alignItems: 'center', paddingRight: 10, paddingTop: 30 }}>
              <TouchableOpacity style={styles.button}
                onPress={this.final_Submission}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logoText: {
    marginVertical: 5,
    fontSize: 39,
    color: '#2ecc71',
    fontWeight: 'bold'
  },
  QuoteText: {
    fontSize: 20,
    color: '#ffffff'
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
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2ecc71',
    textAlign: 'left',
    textAlign: 'center'
  },
  inputBox: {
    width: 320,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ffffff'
  },
  inputBox1: {
    backgroundColor: 'rgba(255, 255,255,0.11)',
    borderRadius: 25,
    paddingHorizontal: 97,
    paddingVertical: 0
  }
});