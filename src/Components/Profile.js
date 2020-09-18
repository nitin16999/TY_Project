import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, BackHandler, ScrollView, TextInput, AsyncStorage } from 'react-native';
import Divider from 'react-native-divider'
import LinearGradient from 'react-native-linear-gradient'
import Firebase from '../config/firebase'
import CardView from 'react-native-cardview'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { withNavigationFocus } from 'react-navigation';

class Profile extends React.Component {

  static navigationOptions = {
    headerLeft: null
  };

  state = {
    Name: '',
    Age: '',
    BDate: '',
    Email: '',
    Gender: '',
    Male: false,
    Female: false,
    Height: '',
    Weight: '',
    Points: '',
    showDetails: true,
    showUpdate: false,
    updateText: 'Update Details',
    Weightt: null,
    Heightt: null
  }

  Logout = async () => {

    Alert.alert(
      'Logout',
      'Logout from the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Ok',
        onPress: () => Firebase.auth().signOut().then(async () => {
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem("meal")
          await AsyncStorage.removeItem("exercise")
          BackHandler.exitApp()
          console.log("LogOut successful")
        })
          .catch((error) => Alert.alert("LogOut Failed", error.message))
      },], {
      cancelable: false
    }
    )
  }

  UNSAFE_componentWillMount() {
    setInterval(this.getData, 1000); // runs every 3 seconds.     
  }
  getData = () => {
    const user = Firebase.auth().currentUser
    if (user) {
      Firebase.firestore().collection('Users').doc(user.uid).get().then(doc => {
        this.setState({
          Name: doc.data().Name,
          Age: doc.data().Age,
          BDate: moment(doc.data().BDate).format("DD-MM-YYYY"),
          Email: doc.data().Email,
          Gender: doc.data().Gender,
          Height: doc.data().Height,
          Weight: doc.data().Weight,
          Points: doc.data().Points
        })
      })
    }
    if (this.state.Gender == 'Male') {
      this.setState({
        Male: true
      })
    }
    if (this.state.Gender == 'Female') {
      this.setState({
        Female: true
      })
    }
    console.disableYellowBox = true;
  }

  updateDetails = () => {
    if (this.state.showDetails == true && this.state.showUpdate == false) {
      this.setState({
        showDetails: false,
        showUpdate: true,
        updateText: 'Save Details'
      })
    }

    if (this.state.showUpdate == true && this.state.showDetails == false) {
      this.setState({
        showDetails: true,
        showUpdate: false,
        updateText: 'Update Details'
      })
      const user = Firebase.auth().currentUser
      if (this.state.Weightt != null && this.state.Heightt != null) {
        Firebase.firestore().collection('Users').doc(user.uid).update({
          Height: this.state.Heightt,
          Weight: this.state.Weightt
        })
          .then(
            this.setState({
              Weightt: null,
              Heightt: null
            }),
            Alert.alert("Height & Weight Updated"))
      }
      if (this.state.Weightt == null && this.state.Heightt != null) {
        Firebase.firestore().collection('Users').doc(user.uid).update({
          Height: this.state.Heightt,
        })
          .then(
            this.setState({
              Heightt: null
            }),
            Alert.alert("Height Updated"))
      }
      if (this.state.Weightt != null && this.state.Heightt == null) {
        Firebase.firestore().collection('Users').doc(user.uid).update({
          Weight: this.state.Weightt
        })
          .then(
            this.setState({
              Weightt: null
            }),
            Alert.alert("Weight Updated"))
      }
      if (this.state.Weightt == null && this.state.Heightt == null) {
        Alert.alert("Update Failed", "Height and Weight Fields Both are Empty")
      }
    }
  }


  render() {
    return (

      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <View style={{ width: '100%', Height: '100%' }}>
          <ScrollView>
            <View style={styles.container}>

              <Divider orientation="center">
                <Text style={styles.heading}>Profile</Text>
              </Divider>

              <View flexDirection='row' paddingTop={5}>
                <CardView
                  cardElevation={30}
                  cornerRadius={40}
                  style={{
                    width: 100,
                    marginVertical: 10,
                    marginHorizontal: 10,
                    backgroundColor: '#2e3e50',
                  }}>

                  {this.state.Female ?
                    <View>
                      <Icon style={{ paddingLeft: 38, paddingRight: 0, paddingBottom: 20, paddingTop: 20 }} name='ios-woman' size={50} color='#e74c3c' />
                    </View>
                    : null}

                  {this.state.Male ?
                    <View>
                      <Icon style={{ paddingLeft: 38, paddingRight: 0, paddingBottom: 20, paddingTop: 20 }} name='ios-man' size={50} color='#e74c3c' />
                    </View>
                    : null}

                </CardView>
                <View flexDirection='column' style={{ paddingLeft: 10 }}>
                  <Text style={{ color: '#3498db', fontSize: 35, fontWeight: 'bold', paddingTop: 20 }}>{this.state.Name}</Text>
                  <Text style={{ color: '#fff', fontSize: 15 }}>{this.state.Email}</Text>
                </View>
              </View>

              <Divider orientation="center">
                <Text style={styles.heading}>Details</Text>
              </Divider>

              <CardView
                cardElevation={30}
                cornerRadius={40}
                style={{
                  width: 340,
                  tintColor: 'rgba(255, 255,255,5)',
                  marginVertical: 20,
                  marginHorizontal: 10,
                  backgroundColor: '#232f34'
                }}>
                <LinearGradient colors={['#2e3e50', '#232f34']}>

                  {this.state.showDetails ?
                    <View style={{ alignSelf: 'flex-start' }}>

                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', fontSize: 19, paddingBottom: 20, paddingTop: 20, paddingLeft: 35 }}>Height:</Text>
                        <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold', paddingBottom: 20, paddingTop: 20, paddingLeft: 10 }}> {this.state.Height}cm.</Text>
                      </View>

                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', fontSize: 19, paddingBottom: 20, paddingLeft: 35 }}>Weight:</Text>
                        <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold', paddingBottom: 20, paddingLeft: 10 }}> {this.state.Weight}kg.</Text>
                      </View>

                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', fontSize: 19, paddingBottom: 20, paddingLeft: 35 }}>Birth Date:</Text>
                        <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold', paddingBottom: 20, paddingLeft: 10 }}> {this.state.BDate}</Text>
                      </View>

                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', fontSize: 19, paddingBottom: 20, paddingLeft: 35 }}>Points:</Text>
                        <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold', paddingBottom: 20, paddingLeft: 10 }}> {this.state.Points} Pts.</Text>
                      </View>


                    </View>
                    : null}

                  {this.state.showUpdate ?
                    <View style={{ alignSelf: 'flex-start' }}>

                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', fontSize: 19, paddingBottom: 20, paddingTop: 33, paddingLeft: 25, paddingRight: 10 }}>Height:</Text>
                        <TextInput style={styles.inputBox}
                          placeholder='here..'
                          selectionColor="#232f34"
                          keyboardType="numeric"
                          placeholderTextColor="rgba(255, 255,255,0.9)"
                          onChangeText={Heightt => this.setState({ Heightt })}
                        />
                      </View>

                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', fontSize: 19, paddingBottom: 30, paddingLeft: 25, paddingTop: 33, paddingRight: 10 }}>Weight:</Text>
                        <TextInput style={styles.inputBox}
                          placeholder='here..'
                          selectionColor="#232f34"
                          keyboardType="numeric"
                          placeholderTextColor="rgba(255, 255,255,0.9)"
                          onChangeText={Weightt => this.setState({ Weightt })}
                        />
                      </View>

                    </View>
                    : null}

                  <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 16, paddingBottom: 10 }} numberOfLines={1}>
                    __________________________________________________
                </Text>

                  <View>
                    <TouchableOpacity onPress={this.updateDetails} style={{ paddingBottom: 10 }}>
                      <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#3498db', paddingLeft: 115 }}>{this.state.updateText}</Text>
                    </TouchableOpacity>
                  </View>


                </LinearGradient>
              </CardView>

              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17, paddingLeft: 15, paddingBottom: 30, paddingTop: 5 }}>Note: Update your Height and Weight monthly or weekly for better diet plan.</Text>

              <TouchableOpacity onPress={() => this.Logout()} style={styles.button} >
                <Text style={styles.buttonText}>LogOut</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    )
  }
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ecc71'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 300,
    backgroundColor: '#232f34',
    borderRadius: 25,
    marginVertical: 12,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center'
  },
  inputBox: {
    width: 240,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ffffff',
    marginVertical: 20
  }
});


export default withNavigationFocus(Profile);
