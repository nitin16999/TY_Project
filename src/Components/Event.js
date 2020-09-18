import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Divider from 'react-native-divider';
import CardView from 'react-native-cardview';
import { BarChart, YAxis } from 'react-native-svg-charts';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Firebase from '../config/firebase';
import moment from 'moment';
import { withNavigationFocus } from 'react-navigation';


var jan = 'To complete the task of January month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var feb = 'To complete the task of February month you have to walk 2,00,000 stpes which is roughly 153 km. While doing that you will approximately burn 8000 cal. If you Succeed, you will get "2000" Points';
var mar = 'To complete the task of March month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var apr = 'To complete the task of April month you have to walk 2,10,000 stpes which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var may = 'To complete the task of May month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var jun = 'To complete the task of June month you have to walk 2,10,000 stpes which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var jul = 'To complete the task of July month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var aug = 'To complete the task of August month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var sep = 'To complete the task of September month you have to walk 2,10,000 stpes which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var oct = 'To complete the task of October month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var nov = 'To complete the task of November month you have to walk 2,10,000 stpes which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var dec = 'To complete the task of December month you have to walk 2,20,000 stpes which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var janEvent = 'Joyfull January'; var febEvent = 'Fast February'; var marEvent = 'Moving March'; var aprEvent = 'Active April'; var mayEvent = 'Marvelous May'; var junEvent = 'Jumping June';
var julEvent = 'Joyfull July'; var augEvent = 'Active August'; var sepEvent = 'Sprinting September'; var octEvent = 'Outstanding October'; var novEvent = 'November'; var decEvent = 'December';
var daysLeftEventOne = moment().endOf('month').format('DD') - moment().format('DD');

class Event extends React.Component {

  static navigationOptions = {
    fontWeight: 'bold',
    title: 'Helath-Care',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#232f34',
    },
    headerTintColor: '#ffffff'
  }

  state = {
    view: false,
    viewText: "View More",

    secondCardVisible: false,
    FE_Initial: true,
    FE_Middle: false,
    FE_Final: false,

    firstCardDis: '',
    secondCardDis: '',
    firstCardHed: '',
    secondCradHed: '',
    targetStpes1: '',
    targetStpes2: '',

    currentMonth: (moment().format('MMM')),

    eventCard2BtnTxt: 'Join Now',

    accessToken: null,
    fillStpes: 50,
    date: null
  }


  UNSAFE_componentWillMount = () => {
    setInterval(this.getData, 4000); // runs every 3 seconds.      
  }

  getData = async () => {
    console.disableYellowBox = true;
    if ((this.state.currentMonth) == 'Jan') { this.setState({ firstCardDis: jan, secondCardDis: feb, firstCardHed: janEvent, secondCardHed: febEvent, targetStpes1: '1,20,000', targetStpes2: '1,00,000' }) }
    if ((this.state.currentMonth) == 'Feb') { this.setState({ firstCardDis: feb, secondCardDis: mar, firstCardHed: febEvent, secondCardHed: marEvent, targetStpes1: '1,00,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Mar') { this.setState({ firstCardDis: mar, secondCardDis: apr, firstCardHed: marEvent, secondCardHed: aprEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Apr') { this.setState({ firstCardDis: apr, secondCardDis: may, firstCardHed: aprEvent, secondCardHed: mayEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'May') { this.setState({ firstCardDis: may, secondCardDis: jun, firstCardHed: mayEvent, secondCardHed: junEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Jun') { this.setState({ firstCardDis: jun, secondCardDis: jul, firstCardHed: junEvent, secondCardHed: julEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Jul') { this.setState({ firstCardDis: jul, secondCardDis: aug, firstCardHed: julEvent, secondCardHed: augEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Aug') { this.setState({ firstCardDis: aug, secondCardDis: sep, firstCardHed: augEvent, secondCardHed: sepEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Sep') { this.setState({ firstCardDis: sep, secondCardDis: oct, firstCardHed: sepEvent, secondCardHed: octEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Oct') { this.setState({ firstCardDis: oct, secondCardDis: nov, firstCardHed: octEvent, secondCardHed: novEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Nov') { this.setState({ firstCardDis: nov, secondCardDis: dec, firstCardHed: novEvent, secondCardHed: decEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }
    if ((this.state.currentMonth) == 'Dec') { this.setState({ firstCardDis: dec, secondCardDis: jan, firstCardHed: decEvent, secondCardHed: janEvent, targetStpes1: '1,20,000', targetStpes2: '1,20,000' }) }


    // 1st day event
    if ((moment().format('Do')) == '1st') {
      let secondEventBooked = await AsyncStorage.getItem("secondEventBooked")
      if (secondEventBooked) {
        let firstEventDate = moment().format('YYYY-MM-DD')
        let firstEventBooked = "Booked"
        await AsyncStorage.setItem('firstEventDate', firstEventDate)
        await AsyncStorage.setItem('firstEventBooked', firstEventBooked)
        await AsyncStorage.removeItem('secondEventBooked');
      }
      else {
        await AsyncStorage.removeItem('firstEventBooked');
        await AsyncStorage.removeItem('firstEventDate');
      }
    }

    //to hide and show second event card
    if (parseInt(moment().format('D')) >= 15) {
      this.setState({
        secondCardVisible: true,
      })
    }
    else {
      this.setState({
        secondCardVisible: false
      })
    }

    //manage 1st event
    let firstEventBooked = await AsyncStorage.getItem("firstEventBooked")
    let firstEventDate = await AsyncStorage.getItem('firstEventDate')
    if (firstEventBooked) {
      this.setState({
        FE_Initial: false,
        FE_Middle: true,
        FE_Final: false,
        date: firstEventDate
      })
      this.setData
    }
    else {
      this.setState({
        FE_Initial: true,
        FE_Middle: false,
        FE_Final: false,
        date: null
      })
    }

    //manage second card
    let secondEventBooked = await AsyncStorage.getItem("secondEventBooked")
    if (secondEventBooked) {
      this.setState({
        eventCard2BtnTxt: 'Joined!!!',
      })
    }
    else {
      this.setState({
        eventCard2BtnTxt: 'Join Now',
      })
    }

    //Fitbit data...
    let Access_Token = await AsyncStorage.getItem("token")
    if (Access_Token != null) {
      this.setState({
        accessToken: Access_Token
      })
    }
  }

  setData = () => {
    let today = moment().format('YYYY-MM-DD')
    fetch('https://api.fitbit.com/1.2/user/-/activities/tracker/steps/date/' + this.state.date + '/' + today + '.json', {
      //fetch('https://api.fitbit.com/1.2/user/-/activities/stpes/' + this.sate.date + '/'+today+'.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.data}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(`response: ${JSON.stringify(res)}`);
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  joinPressed1 = () => {
    requestAnimationFrame(async () => {
      let firstEventDate = moment().format('YYYY-MM-DD')
      let firstEventBooked = 'Booked'
      await AsyncStorage.setItem('firstEventDate', firstEventDate)
      await AsyncStorage.setItem('firstEventBooked', firstEventBooked)
    });
  }

  joinPressed2 = () => {
    requestAnimationFrame(async () => {
      let secondEventBooked = "PreBooked"
      await AsyncStorage.setItem('secondEventBooked', secondEventBooked)
    });
  }

  viewPresed = () => {
    if (this.state.view == false) {
      this.setState({
        view: true,
        viewText: "View Less"
      })
    }
    if (this.state.view == true) {
      this.setState({
        view: false,
        viewText: "View More"
      })
    }
  }

  render() {
    return (

      <LinearGradient colors={['#232f34', '#2e3e50', '#2e3e50']} style={styles.container} >
        <ScrollView>
          <View style={{ width: 400, alignItems: 'center' }}>
            <Divider orientation="center">
              <Text style={styles.heading}>Events</Text>
            </Divider>

            <CardView
              cardElevation={30}
              cornerRadius={40}
              style={{
                width: 340,
                tintColor: 'rgba(255, 255,255,5)',
                marginVertical: 20,
                marginHorizontal: 10,
                backgroundColor: '#232f34',
              }}>
              <LinearGradient colors={['#2e3e50', '#232f34']}>
                {
                  this.state.FE_Initial ?
                    <View>
                      <Text style={{ fontSize: 27, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingTop: 10 }}>{this.state.firstCardHed}</Text>
                      <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                        ____________________________________________________
                    </Text>
                      <Text style={{ paddingTop: 5, paddingLeft: 10, paddingRight: 0, color: "#fff", fontSize: 16, fontWeight: '100' }}>   {(this.state.firstCardDis)}</Text>
                      <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                        ____________________________________________________
                    </Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>Start Date: {moment().startOf('month').format('DD-MM-YYYY')}</Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>End Date: {moment().endOf('month').format('DD-MM-YYYY')}</Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>Target To Achive: {this.state.targetStpes1} Stpes</Text>
                      <View flexDirection='row'>
                        <TouchableOpacity onPress={this.joinPressed1} style={styles.button}>
                          <Text style={styles.buttonText}>Join Now</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    : null
                }
                {
                  this.state.FE_Middle ?
                    <View>
                      <LinearGradient colors={['#2e3e50', '#232f34']}>
                        <Text style={{ fontSize: 27, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingTop: 10 }}>{this.state.firstCardHed}</Text>
                        <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                          ____________________________________________________
                      </Text>
                        <View flexDirection='row'>
                          <Text>                                         </Text>
                          <AnimatedCircularProgress
                            style={{ paddingLeft: 0, paddingBottom: 20, paddingTop: 10 }}
                            size={100}
                            width={15}
                            fill={this.state.fillStpes}
                            tintColor="#fff"
                            backgroundColor="#3d5875">
                            {
                              (fill) => (
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingLeft: 7, paddingTop: 19 }}>
                                  {this.state.fillStpes}%
                                </Text>
                              )
                            }
                          </AnimatedCircularProgress>
                        </View>
                        <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                          ____________________________________________________
                      </Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#3498db', textAlign: 'left', paddingLeft: 30 }}>Start Date: {moment().startOf('month').format('DD-MM-YYYY')}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#3498db', textAlign: 'left', paddingLeft: 30 }}>End Date: {moment().endOf('month').format('DD-MM-YYYY')}</Text>

                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', textAlign: 'left', paddingLeft: 30, paddingBottom: 0 }}>Days Left: {daysLeftEventOne}</Text>
                        <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                          ____________________________________________________
                      </Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#3498db', textAlign: 'left', paddingLeft: 30 }}>Target To Achive: {this.state.targetStpes1} Stpes</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', textAlign: 'left', paddingLeft: 30 }}>stpes Done: 60,000</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', textAlign: 'left', paddingLeft: 30, paddingBottom: 20 }}>stpes Left: 60,000</Text>
                      </LinearGradient>
                    </View>
                    : null
                }
                {
                  this.state.FE_Final ?
                    <View>
                      <Text>Task Completed</Text>
                    </View>
                    : null
                }
              </LinearGradient>
            </CardView>

            {this.state.secondCardVisible ?
              <View>
                <CardView
                  cardElevation={30}
                  cornerRadius={40}
                  style={styles.cardViewStyle}>
                  <LinearGradient colors={["#2e3e50", '#232f34']}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingTop: 10 }}>{this.state.secondCardHed}</Text>
                    <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                      ____________________________________________________
                  </Text>
                    <Text style={{ paddingTop: 5, paddingLeft: 10, color: "#fff", fontSize: 16, fontWeight: '100' }}>   {this.state.secondCardDis}</Text>
                    <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                      ____________________________________________________
                  </Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>Start Date: {moment().add(1, 'months').startOf('month').format('DD-MM-YYYY')}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>End Date: {moment().add(1, 'months').endOf('month').format('DD-MM-YYYY')}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>Target To Achive: {this.state.targetStpes2} Stpes</Text>
                    <View flexDirection='row'>
                      <TouchableOpacity onPress={this.joinPressed2} style={styles.button}>
                        <Text style={styles.buttonText}>{this.state.eventCard2BtnTxt}</Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </CardView>
              </View>
              : null}
          </View>

          {/* //dash Board code starts from Here */}
          <View alignItems='center'>
            <Divider orientation="center">
              <Text style={styles.heading}>Leaderboard</Text>
            </Divider>
            <CardView
              flex={1}
              cardElevation={40}
              cornerRadius={40}
              style={{
                width: 340,
                tintColor: 'rgba(255, 255,255,5)',
                marginVertical: 25,
                marginHorizontal: 5,
                backgroundColor: '#232f34',
                alignItems: 'center',
              }}>
              <LinearGradient colors={['#2e3e50', '#2e3e50', '#232f34']} style={styles.container} >
                <CardView
                  cardElevation={40}
                  cornerRadius={30}
                  style={{
                    width: 330,
                    height: 250,
                    tintColor: 'rgba(255, 255,255,5)',
                    marginVertical: 20,
                    marginHorizontal: 10,
                    backgroundColor: '#232f34',
                    alignItems: 'center',
                  }}
                >

                  <View flexDirection='row'>
                    <YAxis
                      style={{ marginLeft: 10 }}
                      data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      contentInset={{ top: 20, bottom: 30 }}
                      svg={{ fill: '#fff', fontSize: 12 }}
                      numberOfTicks={10}
                      formatLabel={data => `${data * 10}%`}
                    />

                    <View flex={1}>
                      <BarChart
                        style={{ height: 200, width: 310, marginTop: 10, marginLeft: 10 }}
                        data={[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]}
                        svg={{ fill: '#48555e', fillOpacity: 1, stroke: '#232f34', strokeWidth: 2, x: 0, y: 0 }}
                      >
                      </BarChart>
                      <View flexDirection='row'>
                        <Text style={{ color: '#fff', paddingLeft: 15, paddingRight: 5, fontSize: 11 }}>1%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>15%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>4%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>10%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>10%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>10%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>0%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>20%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>10%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>10%</Text>
                      </View>

                    </View>
                  </View>
                </CardView>
                <View flexDirection="row">
                  <Text style={{ paddingLeft: 25, paddingRight: 5, color: "#fff", fontSize: 15, fontWeight: 'bold' }}>X Axis: Number of users(%),</Text>
                  <Text style={{ paddingRight: 20, color: "#fff", fontSize: 15, fontWeight: 'bold' }}>Y Axis: Highest Points(%)</Text>
                </View>
                <Text style={{ paddingTop: 20, paddingLeft: 25, paddingRight: 20, color: "#fff", fontSize: 17, fontWeight: 'bold' }}>    You belong to 5% of the people Whose score falls between 80-90% as compared to the top score</Text>
                <Text></Text>
                {
                  this.state.view ?

                    <View>
                      <View flexDirection='row'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 135, paddingBottom: 0 }}>Me</Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 30, paddingBottom: 0 }}>  Others(Avg.)</Text>
                      </View>
                      <Text style={{ fontSize: 15, color: "#fff" }} numberOfLines={1}>
                        ___________________________________________________
                      </Text>
                    </View>

                    : null}
                {
                  this.state.view ?
                    <View flexDirection="row">
                      <View flexDirection='column'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>Points</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>Stpes</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>Calories</Text>
                      </View>
                      <View flexDirection='column'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>6000</Text>
                        <Text>      </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>25000</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>12000</Text>
                      </View>
                      <View flexDirection='column'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10 }}>1500</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10 }}>1000</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10 }}>1500</Text>
                      </View>
                    </View>
                    : null}
                {
                  this.state.view ?
                    <Text style={{ paddingTop: 14, paddingLeft: 25, paddingRight: 20, color: "#2ecc71", fontSize: 18, fontWeight: 'bold' }}>You are Better Than Average.</Text>
                    : null}
                <View flexDirection='row'>
                  <TouchableOpacity style={styles.button}
                    onPress={() => this.viewPresed()}>
                    <Text style={styles.buttonText}>{this.state.viewText}</Text>
                  </TouchableOpacity>
                  <Text>    </Text>
                </View>
              </LinearGradient>
            </CardView>
          </View>
        </ScrollView>
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

  cardViewStyle: {
    width: 340,
    //height: 280,
    tintColor: 'rgba(255, 255,255,5)',
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#232f34' //48555e
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2ecc71',
    textAlign: 'center'
  },
  button: {
    width: 130,
    backgroundColor: '#2e3e50',
    borderRadius: 25,
    paddingVertical: 13,
    marginLeft: 200,
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  }

});


export default withNavigationFocus(Event);
