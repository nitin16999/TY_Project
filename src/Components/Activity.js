import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, AsyncStorage, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Divider from 'react-native-divider'
import CardView from 'react-native-cardview';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons'; // for calender
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import qs from 'qs';
import config from '../config/config'
import moment from 'moment';
import { withNavigationFocus } from 'react-navigation';

class Activity extends React.Component {

  state = {
    key: null,
    date: moment().startOf('month').format('YYYY-MM-DD'),
    data2: [],
    data1: [],
    stpes: 0,
    totalStpes: 0,
    isDateTimePickerVisible: false,
    chosenDate: moment().format('YYYY-MM-DD'),
    t1: 2200
  }

  OAuth(client_id) {
    const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
      response_type: 'token',
      client_id,
      redirect_uri: 'fitbit://fit',
      scope: 'activity',
      expires_in: '31536000',
    })}`;

    Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          handleUrl(url)
        }
      })
      .catch(err => {
        console.log('Deeplinking error', err)
      })

    handleUrl = async (event) => {
      if (event) {
        const [, query_string] = event.match(/\#(.*)/);
        const query = qs.parse(query_string);
        let token = query.access_token;
        this.setState({
          key: token
        })
        await AsyncStorage.setItem("token", token)
      }
    }
  }

  getData1 = async () => {
    let firstEventBooked = await AsyncStorage.getItem("firstEventBooked")
    if (firstEventBooked) {
      let today = moment().format('YYYY-MM-DD')
      fetch('https://api.fitbit.com/1.2/user/-/activities/tracker/steps/date/' + this.state.date + '/' + today + '.json', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.key}`,
        }
      })
        .then(res => res.json())
        .then(async res => {
          this.setState({
            data1: res
          })
          let o = []
          o = this.state.data1['activities-tracker-steps']
          for (x in o) {
            this.setState({
              totalStpes: this.state.totalStpes + parseInt(o[x].value)
            })
          }
          await AsyncStorage.setItem('totalStpes', this.state.totalStpes.toString())
        })
        .catch(err => {
          console.error('Error: ', err);
        });
    }
  }

  getData2 = async () => {
    let b = await AsyncStorage.getItem("totalStpes")
    console.log(b)
    //for this one
    fetch('https://api.fitbit.com/1.2/user/-/activities/tracker/steps/date/' + this.state.chosenDate + '/' + this.state.chosenDate + '.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.key}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data2: res
        })
        let o = []
        o = this.state.data2['activities-tracker-steps']
        this.setState({
          stpes: parseInt(o[0].value)
        })
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  UNSAFE_componentWillMount = async () => {
    let Access_Token = await AsyncStorage.getItem("token")
    if (Access_Token == null) {
      this.OAuth(config.client_id);
    }
    else {
      this.setState({
        key: Access_Token
      })
      this.getData1()

      this.getData2()
    }
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
      chosenDate: (moment(date).format('YYYY-MM-DD')), // moment().format('YYYY-MM-DD'),
    })
    if (this.state.status == true) {
      this.setState({ status: false })
    }
    this.getData2()
  };

  render() {
    return (

      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <StatusBar backgroundColor="#232f34" barStyle="light-content" />
        <View style={{ width: '100%', Height: '100%' }}>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.container}>
              <Divider orientation="center">
                <Text style={{ fontSize: 32, color: '#2ecc71', fontWeight: 'bold', textAlign: 'center' }}>Physical Activity</Text>
              </Divider>
              <CardView
                flex={1}
                cardElevation={40}
                cornerRadius={40}
                style={{
                  width: 360,
                  tintColor: 'rgba(255, 255,255,5)',
                  marginVertical: 40,
                  marginHorizontal: 5,
                  backgroundColor: '#232f34',
                  alignItems: 'center',
                }}>
                <LinearGradient colors={['#2e3e50', '#2e3e50', '#232f34']} style={styles.container} >
                  <CardView
                    cardElevation={40}
                    cornerRadius={30}
                    style={{
                      width: 340,
                      tintColor: 'rgba(255, 255,255,5)',
                      marginTop: 20,
                      marginHorizontal: 15,
                      backgroundColor: '#232f34',
                      alignItems: 'center',
                    }}>
                    <View flexDirection='row'>
                      <AnimatedCircularProgress
                        style={{ paddingLeft: 0, paddingBottom: 20, paddingTop: 20 }}
                        size={100}
                        width={15}
                        fill={parseInt(((this.state.stpes * 100) / 7000).toFixed(0))}
                        tintColor="#fff"
                        backgroundColor="#3d5875">
                        {
                          (fill) => (
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingLeft: 7, paddingTop: 40 }}>
                              {((this.state.stpes * 100) / 7000).toFixed(0)}%
                            </Text>
                          )
                        }
                      </AnimatedCircularProgress>
                    </View>
                  </CardView>
                  <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 16, paddingBottom: 10 }} numberOfLines={1}>
                    __________________________________________________
                  </Text>
                  <View>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 20, color: "#fff", paddingBottom: 10, fontWeight: 'bold' }} numberOfLines={1}> Target Steps:</Text>
                      <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold' }} >7000</Text>
                    </View>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 20, color: "#fff", paddingBottom: 10, fontWeight: 'bold' }} numberOfLines={1}> Total Steps:</Text>
                      <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold' }} >{this.state.stpes}</Text>
                    </View>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 20, color: "#fff", paddingBottom: 10, fontWeight: 'bold' }} numberOfLines={1}> Total calories burned:</Text>
                      <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold' }} >{(this.state.stpes * 0.04).toFixed(2)} kcal</Text>
                    </View>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 20, color: "#fff", paddingBottom: 10, fontWeight: 'bold' }} numberOfLines={1}> Total distance covered:</Text>
                      <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 10, paddingBottom: 10, fontWeight: 'bold' }} >{(this.state.stpes * 0.0008).toFixed(3)} Km</Text>
                    </View>
                  </View>
                </LinearGradient>
              </CardView>

              <Divider orientation="center">
                <Text style={{ fontSize: 32, color: '#2ecc71', fontWeight: 'bold', textAlign: 'center', paddingBottom: 40 }}>Select Date</Text>
              </Divider>
              <View style={{ paddingHorizontal: 28 }}>
                <TouchableOpacity style={styles.button}
                  onPress={this._showDateTimePicker}>
                  <View flexDirection='row'>
                    <Text style={{ paddingVertical: 12, fontSize: 20, color: '#3498db', paddingLeft: 85, fontWeight: 'bold' }}>{this.state.chosenDate}</Text>
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
            </View>
          </ScrollView>
        </View>
      </LinearGradient >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    backgroundColor: '#232f34',
    borderRadius: 25,
    marginTop: 40,
    paddingVertical: 2,
    marginBottom: 92

  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  },
  cardViewStyle: {
    width: 340,
    tintColor: 'rgba(255, 255,255,5)',
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#232f34'
  },
});


export default withNavigationFocus(Activity);
