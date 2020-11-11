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

var jan = 'To complete the task of January month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var feb = 'To complete the task of February month you have to walk 2,00,000 steps which is roughly 153 km. While doing that you will approximately burn 8000 cal. If you Succeed, you will get "2000" Points';
var mar = 'To complete the task of March month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var apr = 'To complete the task of April month you have to walk 2,10,000 steps which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var may = 'To complete the task of May month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var jun = 'To complete the task of June month you have to walk 2,10,000 steps which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var jul = 'To complete the task of July month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var aug = 'To complete the task of August month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var sep = 'To complete the task of September month you have to walk 2,10,000 steps which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var oct = 'To complete the task of October month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
var nov = 'To complete the task of November month you have to walk 2,10,000 steps which is roughly 160 km. While doing that you will approximately burn 8400 cal. If you Succeed, you will get "2100" Points';
var dec = 'To complete the task of December month you have to walk 2,20,000 steps which is roughly 168 km. While doing that you will approximately burn 8800 cal. If you Succeed, you will get "2200" Points';
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
    v1: false,
    v2: false,
    v3: false,

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
    t1: 0,
    currentMonth: (moment().format('MMM')),

    eventCard2BtnTxt: 'Join Now',

    date: null,
    stpes: null,

    points: 0,
    others: [],
    topScore: null,
    avg: 0,
    s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0, m1: 0,
    m2: ''
  }


  UNSAFE_componentWillMount = () => {
    setInterval(this.getData, 6000); // runs every 1 seconds. 
  }


  // get data function
  getData = async () => {
    console.disableYellowBox = true;
    if ((this.state.currentMonth) == 'Jan') { this.setState({ firstCardDis: jan, secondCardDis: feb, firstCardHed: janEvent, secondCardHed: febEvent, targetStpes1: '2,20,000', targetStpes2: '2,00,000', t1: 220000 }) }
    if ((this.state.currentMonth) == 'Feb') { this.setState({ firstCardDis: feb, secondCardDis: mar, firstCardHed: febEvent, secondCardHed: marEvent, targetStpes1: '2,00,000', targetStpes2: '2,20,000', t1: 200000 }) }
    if ((this.state.currentMonth) == 'Mar') { this.setState({ firstCardDis: mar, secondCardDis: apr, firstCardHed: marEvent, secondCardHed: aprEvent, targetStpes1: '2,20,000', targetStpes2: '2,10,000', t1: 220000 }) }
    if ((this.state.currentMonth) == 'Apr') { this.setState({ firstCardDis: apr, secondCardDis: may, firstCardHed: aprEvent, secondCardHed: mayEvent, targetStpes1: '2,10,000', targetStpes2: '2,20,000', t1: 210000 }) }
    if ((this.state.currentMonth) == 'May') { this.setState({ firstCardDis: may, secondCardDis: jun, firstCardHed: mayEvent, secondCardHed: junEvent, targetStpes1: '2,20,000', targetStpes2: '2,10,000', t1: 220000 }) }
    if ((this.state.currentMonth) == 'Jun') { this.setState({ firstCardDis: jun, secondCardDis: jul, firstCardHed: junEvent, secondCardHed: julEvent, targetStpes1: '2,10,000', targetStpes2: '2,20,000', t1: 210000 }) }
    if ((this.state.currentMonth) == 'Jul') { this.setState({ firstCardDis: jul, secondCardDis: aug, firstCardHed: julEvent, secondCardHed: augEvent, targetStpes1: '2,20,000', targetStpes2: '2,20,000', t1: 220000 }) }
    if ((this.state.currentMonth) == 'Aug') { this.setState({ firstCardDis: aug, secondCardDis: sep, firstCardHed: augEvent, secondCardHed: sepEvent, targetStpes1: '2,20,000', targetStpes2: '2,10,000', t1: 220000 }) }
    if ((this.state.currentMonth) == 'Sep') { this.setState({ firstCardDis: sep, secondCardDis: oct, firstCardHed: sepEvent, secondCardHed: octEvent, targetStpes1: '2,10,000', targetStpes2: '2,20,000', t1: 210000 }) }
    if ((this.state.currentMonth) == 'Oct') { this.setState({ firstCardDis: oct, secondCardDis: nov, firstCardHed: octEvent, secondCardHed: novEvent, targetStpes1: '2,20,000', targetStpes2: '2,10,000', t1: 220000 }) }
    if ((this.state.currentMonth) == 'Nov') { this.setState({ firstCardDis: nov, secondCardDis: dec, firstCardHed: novEvent, secondCardHed: decEvent, targetStpes1: '2,10,000', targetStpes2: '2,20,000', t1: 210000 }) }
    if ((this.state.currentMonth) == 'Dec') { this.setState({ firstCardDis: dec, secondCardDis: jan, firstCardHed: decEvent, secondCardHed: janEvent, targetStpes1: '2,20,000', targetStpes2: '2,20,000', t1: 220000 }) }

    // //Fitbit data...
    // let Access_Token = await AsyncStorage.getItem("token")
    // if (Access_Token != null) {
    //   this.setState({
    //     accessToken: Access_Token
    //   })
    //   console.log(this.state.accessToken + '--------------------------------------------------')
    // }

    //firebase data
    const user = Firebase.auth().currentUser
    Firebase.firestore().collection('Users').doc(user.uid).get().then(doc => {
      this.setState({
        points: doc.data().Points
      })
    })

    Firebase.firestore().collection('Users').get()
      .then(querySnapshot => {
        let s = []
        querySnapshot.docs.forEach(doc => {
          s = s.concat(parseInt(doc.data().Points));
        })
        this.setState({
          others: s
        })
        this.setState({
          topScore: (Math.max(...this.state.others)) //Math.max
        })
        this.avgCalculator()
      });


    // 1st day event
    if ((moment().format('Do')) == '1st') {
      await AsyncStorage.removeItem('pointsAdded');
      let secondEventBooked = await AsyncStorage.getItem("secondEventBooked")
      if (secondEventBooked) {
        let firstEventBooked = "Booked"
        await AsyncStorage.setItem('firstEventBooked', firstEventBooked)
        await AsyncStorage.removeItem('secondEventBooked');
      }
      else {
        await AsyncStorage.removeItem('firstEventBooked');
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
    if (firstEventBooked) {
      (this.state.t1)
      if ((this.state.t1) <= this.state.stpes) {
        this.setState({
          FE_Initial: false,
          FE_Middle: false,
          FE_Final: true,
        });
        this.addPoints()
      }
      else {
        this.setState({
          FE_Initial: false,
          FE_Middle: true,
          FE_Final: false,
        });
        this.setData()
      }
    }
    else {
      this.setState({
        FE_Initial: true,
        FE_Middle: false,
        FE_Final: false,
        date: null
      })
    }

    //manage 2nd card
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
  }

  addPoints = async () => {
    const user = Firebase.auth().currentUser
    let added = await AsyncStorage.getItem("pointsAdded")
    if (added.localeCompare('Added') != 0) {
      Firebase.firestore().collection('Users').doc(user.uid).update({
        Points: this.state.points + (this.state.t1 / 100)
      }).then(
        async () => {
          console.log("Points added");
          let add = 'Added'
          await AsyncStorage.setItem('pointsAdded', add)
        }
      )
    }
  }

  avgCalculator = () => {
    this.setState({
      s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0, s10: 0, m1: 0
    })
    let o = 0
    for (x in this.state.others) {
      o = o + this.state.others[x]
    }
    this.state.avg = o - this.state.points
    this.state.avg = (this.state.avg / (this.state.others.length - 1))

    if (this.state.avg < this.state.points) {
      this.setState({
        v1: true,
        v2: false,
        v3: false
      })
    }
    if (this.state.avg > this.state.points) {
      this.setState({
        v1: false,
        v2: true,
        v3: false
      })
    }
    if (this.state.avg == this.state.points) {
      this.setState({
        v1: false,
        v2: false,
        v3: true
      })
    }

    for (x in this.state.others) {
      if (this.state.others[x] >= ((this.state.topScore * 90) / 100)) {
        this.setState({
          s1: this.state.s1 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 90) / 100) && this.state.others[x] >= ((this.state.topScore * 80) / 100)) {
        this.setState({
          s2: this.state.s2 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 80) / 100) && this.state.others[x] >= ((this.state.topScore * 70) / 100)) {
        this.setState({
          s3: this.state.s3 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 70) / 100) && this.state.others[x] >= ((this.state.topScore * 60) / 100)) {
        this.setState({
          s4: this.state.s4 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 60) / 100) && this.state.others[x] >= ((this.state.topScore * 50) / 100)) {
        this.setState({
          s5: this.state.s5 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 50) / 100) && this.state.others[x] >= ((this.state.topScore * 40) / 100)) {
        this.setState({
          s6: this.state.s6 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 40) / 100) && this.state.others[x] >= ((this.state.topScore * 30) / 100)) {
        this.setState({
          s7: this.state.s7 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 30) / 100) && this.state.others[x] >= ((this.state.topScore * 20) / 100)) {
        this.setState({
          s8: this.state.s8 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 20) / 100) && this.state.others[x] >= ((this.state.topScore * 10) / 100)) {
        this.setState({
          s9: this.state.s9 + 1
        })
      }
      if (this.state.others[x] < ((this.state.topScore * 10) / 100) && this.state.others[x] >= ((this.state.topScore * 0) / 100)) {
        this.setState({
          s10: this.state.s10 + 1
        })
      }
    }

    if (((this.state.points * 100) / this.state.topScore).toFixed(0) >= 90) { this.setState({ m1: ((this.state.s1 * 100) / this.state.others.length.toFixed(0)), m2: '100-90%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 90 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 80) { this.setState({ m1: ((this.state.s2 * 100) / this.state.others.length).toFixed(2), m2: '90-80%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 80 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 70) { this.setState({ m1: ((this.state.s3 * 100) / this.state.others.length).toFixed(2), m2: '80-70%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 70 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 60) { this.setState({ m1: ((this.state.s4 * 100) / this.state.others.length).toFixed(2), m2: '70-60%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 60 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 50) { this.setState({ m1: ((this.state.s5 * 100) / this.state.others.length).toFixed(2), m2: '60-50%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 50 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 40) { this.setState({ m1: ((this.state.s6 * 100) / this.state.others.length).toFixed(2), m2: '50-40%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 40 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 30) { this.setState({ m1: ((this.state.s7 * 100) / this.state.others.length).toFixed(2), m2: '40-30%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 30 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 20) { this.setState({ m1: ((this.state.s8 * 100) / this.state.others.length).toFixed(2), m2: '30-20%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 20 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 10) { this.setState({ m1: ((this.state.s9 * 100) / this.state.others.length).toFixed(2), m2: '20-10%' }) }
    if (((this.state.points * 100) / this.state.topScore).toFixed(0) < 10 && ((this.state.points * 100) / this.state.topScore).toFixed(0) >= 0) { this.setState({ m1: ((this.state.s10 * 100) / this.state.others.length).toFixed(2), m2: '10-0%' }) }
  }


  setData = async () => {
    let totalStpes = await AsyncStorage.getItem("totalStpes")
    this.setState({
      stpes: parseInt(totalStpes)
    })
    console.log(this.state.stpes + '--------------------------------')
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
              style={styles.cardViewStyle}
            >
              <LinearGradient colors={['#2e3e50', '#232f34']}>
                {
                  this.state.FE_Initial ?
                    <View>
                      <Text style={{ fontSize: 27, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingTop: 10 }}>{this.state.firstCardHed}</Text>
                      <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                        __________________________________________________
                    </Text>
                      <Text style={{ paddingTop: 5, paddingLeft: 10, paddingRight: 0, color: "#fff", fontSize: 16, fontWeight: '100' }}>   {(this.state.firstCardDis)}</Text>
                      <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                        __________________________________________________
                    </Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>Start Date: {moment().startOf('month').format('DD-MM-YYYY')}</Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>End Date: {moment().endOf('month').format('DD-MM-YYYY')}</Text>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2ecc71', textAlign: 'left', paddingLeft: 15 }}>Target To Achieve: {this.state.targetStpes1} Stpes</Text>
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
                          __________________________________________________
                    </Text>
                        <View flexDirection='row'>
                          <Text>                                     </Text>
                          <AnimatedCircularProgress
                            style={{ paddingLeft: 0, paddingBottom: 20, paddingTop: 10 }}
                            size={100}
                            width={15}
                            fill={parseInt(((this.state.stpes * 100) / this.state.t1).toFixed(0))}
                            tintColor="#fff"
                            backgroundColor="#3d5875">
                            {
                              (fill) => (
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingLeft: 7, paddingTop: 19 }}>
                                  {((this.state.stpes * 100) / this.state.t1).toFixed(0)}%
                                </Text>
                              )
                            }
                          </AnimatedCircularProgress>
                        </View>
                        <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                          __________________________________________________
                    </Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#3498db', textAlign: 'left', paddingLeft: 15 }}>Start Date: {moment().startOf('month').format('DD-MM-YYYY')}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#3498db', textAlign: 'left', paddingLeft: 15 }}>End Date: {moment().endOf('month').format('DD-MM-YYYY')}</Text>

                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', textAlign: 'left', paddingLeft: 15, paddingBottom: 0 }}>Days Left: {daysLeftEventOne}</Text>
                        <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                          __________________________________________________
                    </Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#3498db', textAlign: 'left', paddingLeft: 15 }}>Target To Achive: {this.state.t1} Stpes</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', textAlign: 'left', paddingLeft: 15 }}>stpes Done: {this.state.stpes}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', textAlign: 'left', paddingLeft: 15, paddingBottom: 20 }}>stpes Left: {this.state.t1 - this.state.stpes}</Text>
                      </LinearGradient>
                    </View>
                    : null
                }
                {
                  this.state.FE_Final ?
                    <View>
                      <Text style={{ fontSize: 33, fontWeight: 'bold', color: '#2ecc71', textAlign: 'center', paddingTop: 40 }}>Task completed!!</Text>
                      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingTop: 8 }}>Congratulations....</Text>
                      <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                        __________________________________________________
                      </Text>
                      <Text style={{ paddingTop: 5, paddingLeft: 40, paddingRight: 20, color: "#3498db", fontSize: 19, fontWeight: 'bold', paddingTop: 20, paddingBottom: 40 }}>{(this.state.t1 / 100)} points has been added to your total points</Text>
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
                      __________________________________________________
                  </Text>
                    <Text style={{ paddingTop: 5, paddingLeft: 10, color: "#fff", fontSize: 16, fontWeight: '100' }}>   {this.state.secondCardDis}</Text>
                    <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 15, paddingBottom: 10 }} numberOfLines={1}>
                      __________________________________________________
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
              <Text style={styles.heading}>LeaderBoard</Text>
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
                        <Text style={{ color: '#fff', paddingLeft: 3, paddingRight: 5, fontSize: 11 }}></Text>
                        <Text style={{ color: '#fff', paddingLeft: 8, paddingRight: 5, fontSize: 11 }}>{((this.state.s1 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s2 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s3 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s4 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s5 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s6 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s7 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s8 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s9 * 100) / this.state.others.length).toFixed(0)}%</Text>
                        <Text style={{ color: '#fff', paddingLeft: 5, paddingRight: 5, fontSize: 11 }}>{((this.state.s10 * 100) / this.state.others.length).toFixed(0)}%</Text>
                      </View>
                    </View>
                  </View>
                </CardView>
                <View flexDirection="row">
                  <Text style={{ paddingLeft: 25, paddingRight: 5, color: "#fff", fontSize: 15, fontWeight: 'bold' }}>X Axis: Number of users(%),</Text>
                  <Text style={{ paddingRight: 20, color: "#fff", fontSize: 15, fontWeight: 'bold' }}>Y Axis: Highest Points(%)</Text>
                </View>
                <Text style={{ paddingTop: 20, paddingLeft: 25, paddingRight: 20, color: "#fff", fontSize: 17, fontWeight: 'bold' }}>    You belong to {this.state.m1}% of the people Whose score falls between {this.state.m2} as compared to the top score</Text>
                <Text></Text>
                {
                  this.state.view ?
                    <View>
                      <View flexDirection='row'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 135, paddingBottom: 0 }}>Me</Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingLeft: 30, paddingBottom: 0 }}>  Others(Avg.)</Text>
                      </View>
                      <Text style={{ fontSize: 15, color: "#fff" }} numberOfLines={1}>
                        __________________________________________________
                      </Text>
                    </View>
                    : null}
                {
                  this.state.view ?
                    <View flexDirection="row">
                      <View flexDirection='column'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>Points</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>Steps</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>Calories</Text>
                      </View>
                      <View flexDirection='column'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>{this.state.points}</Text>
                        <Text>      </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>{(this.state.points * 100).toFixed(0)}</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 40 }}>{(this.state.points * 100 * 0.04).toFixed(2)}</Text>
                      </View>
                      <View flexDirection='column'>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10 }}>{(this.state.avg).toFixed(0)}</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10 }}>{(this.state.avg * 100).toFixed(0)}</Text>
                        <Text>          </Text>
                        <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10 }}>{(this.state.avg * 100 * 0.04).toFixed(2)}</Text>
                      </View>
                    </View>
                    : null}
                <Text style={{ fontSize: 15, color: "#fff" }} numberOfLines={1}>
                  __________________________________________________
                      </Text>
                {
                  this.state.v1 ?
                    <Text style={{ fontSize: 20, color: "#2ecc71", paddingRight: 10, paddingLeft: 10, fontWeight: 'bold', paddingVertical: 10 }}>You are Better than average.</Text>
                    : null
                }
                {
                  this.state.v2 ?
                    <Text style={{ fontSize: 20, color: "#e74c3c", paddingRight: 10, paddingLeft: 10, fontWeight: 'bold', paddingVertical: 10 }}>You are Bellow than average.</Text>
                    : null
                }
                {
                  this.state.v3 ?
                    <Text style={{ fontSize: 20, color: "#fff", paddingRight: 10, paddingLeft: 10, fontWeight: 'bold', paddingVertical: 10 }}>Average performance.</Text>
                    : null
                }
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
    tintColor: 'rgba(255, 255,255,5)',
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#232f34'
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