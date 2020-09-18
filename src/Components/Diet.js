import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, ScrollView, AsyncStorage } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Divider from 'react-native-divider'
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/Ionicons'
import Firebase from '../config/firebase'
import moment from 'moment';
import { withNavigationFocus } from 'react-navigation';

class Diet extends React.Component {
  static navigationOptions = {
    headerLeft: null
  };
  state = {
    Height: null,
    Weight: null,
    BDate: null,
    Gender: null,
    Male: null,
    Female: null,
    BMI: null,
    CurrentMonth: null,
    CurrentDate: null,
    CurrentYear: null,
    birthDate: null,
    birthMonth: null,
    birhtYear: null,
    age: 0,
    thisYear: '0',
    BMR: null,
    SevereThinness: null,
    ModerateThinness: null,
    Normal: null,
    Overweight: null,
    Obese: null,
    Calorie: 0,
    exerciseTypeValue: 1.2,
    selectedValue: null,
    selectedMeal: null,
    threeMeal: true,
    fourMeal: false,
    fiveMeal: false
  }
  UNSAFE_componentWillMount = () => {
    this.demo();
    setInterval(this.getData, 4000); // runs every 3 seconds.   
  }

  // UNSAFE_componentWillMount = () => {
  //   setTimeout(async () => {
  //     let userId = await AsyncStorage.getItem("userId")
  //     if (userId) {
  //       this.props.navigation.navigate('home')
  //     }
  //     else {
  //       this.props.navigation.navigate('main')
  //     }
  //   }, 2000)
  // }

  getData = async () => {
    console.disableYellowBox = true;

    //Data from DataBase
    const user = Firebase.auth().currentUser
    if (user) {
      Firebase.firestore().collection('Users').doc(user.uid).get().then(doc => {
        this.setState({
          BDate: doc.data().BDate,
          Gender: doc.data().Gender,
          Height: doc.data().Height,
          Weight: doc.data().Weight,
        })
      })
    }

    // Gender
    if (this.state.Gender == 'Male') {
      this.setState({
        Male: true,
      })
    }
    if (this.state.Gender == 'Female') {
      this.setState({
        Female: true
      })
    }

    //BMI
    this.setState({
      BMI: ((this.state.Weight / (this.state.Height * this.state.Height)) * 10000).toFixed(3)
    })
    if (this.state.BMI < 16) {
      this.setState({
        SevereThinness: true, Obese: false, Overweight: false, Normal: false, ModerateThinness: false,
        Calorie: 1000
      })
    }
    if (this.state.BMI > 16 && this.state.BMI < 18.5) {
      this.setState({
        ModerateThinness: true, Obese: false, Overweight: false, Normal: false, SevereThinness: false,
        Calorie: 500
      })
    }
    if (this.state.BMI > 18.5 && this.state.BMI < 25) {
      this.setState({
        Normal: true, Obese: false, Overweight: false, ModerateThinness: false, SevereThinness: false,
        Calorie: 0
      })
    }
    if (this.state.BMI > 25 && this.state.BMI < 30) {
      this.setState({
        Overweight: true, Obese: false, Normal: false, ModerateThinness: false, SevereThinness: false,
        Calorie: -500
      })
    }
    if (this.state.BMI > 30) {
      this.setState({
        Obese: true, Overweight: false, Normal: false, ModerateThinness: false, SevereThinness: false,
        Calorie: -1000
      })
    }



    //Age
    this.setState({
      CurrentDate: (moment().format('DD')),
      CurrentMonth: (moment().format('MM')),
      CurrentYear: (moment().format('YYYY')),
      birthDate: (moment(this.state.BDate).format('DD')),
      birthMonth: (moment(this.state.BDate).format('MM')),
      birhtYear: (moment(this.state.BDate).format('YYYY'))
    })
    if ((parseInt(this.state.CurrentMonth)) < (parseInt(this.state.birthMonth))) {
      this.setState({
        thisYear: '1'
      })
    }
    else if ((parseInt(this.state.CurrentMonth) == parseInt(this.state.birthMonth)) && (parseInt(this.state.CurrentDate) < parseInt(this.state.birthDate))) {
      this.setState({
        thisYear: '1'
      })
    }
    this.setState({
      age: parseInt(this.state.CurrentYear) - parseInt(this.state.birhtYear) - parseInt(this.state.thisYear)
    })

    //BMR
    if (this.state.Gender == 'Male') {
      this.setState({
        BMR: (88.362 + (13.397 * this.state.Weight) + (4.799 * this.state.Height) - (5.677 * this.state.age)).toFixed(0)
      })
    }
    if (this.state.Gender == 'Female') {
      this.setState({
        BMR: (447.593 + (9.247 * this.state.Weight) + (3.098 * this.state.Height) - (4.330 * this.state.age)).toFixed(0)
      })
    }

    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Setting a timer'];
  }


  // Initial meal type and exercise type check
  demo = async () => {
    let meal = await AsyncStorage.getItem("meal")
    let exercise = await AsyncStorage.getItem("exercise")
    if (meal == null && exercise == null) {
      console.log('true1..................................................................................')
      this.setState({
        selectedValue: 1,
        selectedMeal: 1
      })
    }
    if (meal == null && exercise != null) {
      console.log('true2..................................................................................')
      this.setState({
        selectedValue: parseInt(exercise),
        selectedMeal: 1
      })
    }
    if (meal != null && exercise == null) {
      console.log('true3..................................................................................')
      this.setState({
        selectedValue: 1,
        selectedMeal: parseInt(meal)
      })
    }
    if (meal != null && exercise != null) {
      console.log('true4..................................................................................')
      this.setState({
        selectedValue: parseInt(exercise),
        selectedMeal: parseInt(meal)
      })
    }

  }

  //Intensity of the workout
  exerciseType = async (itemPosition) => {
    if (itemPosition == 1) {
      this.setState({ exerciseTypeValue: 1.2, selectedValue: 1 })
      let e1 = (1).toString()
      await AsyncStorage.removeItem("exercise")
      await AsyncStorage.setItem("exercise", e1)
    }
    if (itemPosition == 2) {
      this.setState({ exerciseTypeValue: 1.375, selectedValue: 2 })
      let e2 = (2).toString()
      await AsyncStorage.removeItem("exercise")
      await AsyncStorage.setItem("exercise", e2)
    }
    if (itemPosition == 3) {
      this.setState({ exerciseTypeValue: 1.55, selectedValue: 3 })
      let e3 = (3).toString()
      await AsyncStorage.removeItem("exercise")
      await AsyncStorage.setItem("exercise", e3)
    }
    if (itemPosition == 4) {
      this.setState({ exerciseTypeValue: 1.725, selectedValue: 4 })
      let e4 = (4).toString()
      await AsyncStorage.removeItem("exercise")
      await AsyncStorage.setItem("exercise", e4)
    }
    if (itemPosition == 5) {
      this.setState({ exerciseTypeValue: 1.9, selectedValue: 5 })
      let e5 = (5).toString()
      await AsyncStorage.removeItem("exercise")
      await AsyncStorage.setItem("exercise", e5)
    }
  }


  //number of meals perday
  mealType = async (itemPosition) => {
    if (itemPosition == 1) {
      this.setState({ selectedMeal: 1, threeMeal: true, fourMeal: false, fiveMeal: false })
      let m1 = (1).toString()
      await AsyncStorage.removeItem("meal")
      await AsyncStorage.setItem("meal", m1)
    }
    if (itemPosition == 2) {
      this.setState({ selectedMeal: 2, threeMeal: false, fourMeal: true, fiveMeal: false })
      let m2 = (2).toString()
      await AsyncStorage.removeItem("meal")
      await AsyncStorage.setItem("meal", m2)
    }
    if (itemPosition == 3) {
      this.setState({ selectedMeal: 3, threeMeal: false, fourMeal: false, fiveMeal: true })
      let m3 = (3).toString()
      await AsyncStorage.removeItem('meal');
      await AsyncStorage.setItem("meal", m3)
    }
  }

  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.container}>
            <Divider orientation="center">
              <Text style={{ fontSize: 32, color: '#2ecc71', fontWeight: 'bold' }}>Overview</Text>
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
                <View flexDirection='row'>
                  {this.state.Female ?
                    <View>
                      <Icon style={{ paddingLeft: 85, paddingRight: 0, paddingBottom: 20, paddingTop: 30 }} name='ios-woman' size={50} color='#ffffff' />
                    </View>
                    : null}
                  {this.state.Male ?
                    <View>
                      <Icon style={{ paddingLeft: 85, paddingRight: 0, paddingBottom: 20, paddingTop: 30 }} name='ios-man' size={50} color='#ffffff' />
                    </View>
                    : null}
                  <View flexDirection='column'>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 70, paddingTop: 10 }}>Height:</Text>
                      <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 0, fontWeight: 'bold', paddingTop: 10 }}> {this.state.Height}cm</Text>
                    </View>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 70, paddingTop: 10 }}>Wight:</Text>
                      <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 0, fontWeight: 'bold', paddingTop: 10 }}> {this.state.Weight}kg</Text>
                    </View>
                    <View flexDirection='row'>
                      <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 70, paddingTop: 10 }}>BMI:</Text>
                      <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 0, fontWeight: 'bold', paddingTop: 10 }}> {this.state.BMI}</Text>
                    </View>
                  </View>
                </View>
                <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 16, paddingBottom: 10 }} numberOfLines={1}>
                  ___________________________________________________
                </Text>
                <View flexDirection='row'>
                  <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 15, paddingBottom: 10 }}>Note: </Text>

                  {this.state.SevereThinness ?
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#e74c3c', paddingLeft: 0, paddingBottom: 10 }}>Gain some Weight. You are severely under-weight.</Text>
                    : null}

                  {this.state.ModerateThinness ?
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#e74c3c', paddingLeft: 0, paddingBottom: 10 }}>Gain Some Weight. You are moderately under-weight.</Text>
                    : null}

                  {this.state.Normal ?
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#3498db', paddingLeft: 0, paddingBottom: 10 }}>Maintain your BMI. Weight is perfect according to your height.</Text>
                    : null}

                  {this.state.Overweight ?
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#e74c3c', paddingLeft: 0, paddingBottom: 10 }}>Lose Some Weight. You are Over-weight.</Text>
                    : null}

                  {this.state.Obese ?
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#e74c3c', paddingLeft: 0, paddingBottom: 10 }}>Lose Some Weight. You comes under Obese class.</Text>
                    : null}


                </View>
              </LinearGradient>
            </CardView>


            <Divider orientation="center">
              <Text style={{ fontSize: 32, color: '#2ecc71', fontWeight: 'bold' }}>Diet Plan</Text>
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

                <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 25, paddingBottom: 5, paddingTop: 10 }}>Exercise Type: </Text>
                <TouchableOpacity style={styles.button}>
                  <Picker style={styles.pickerStyle}
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemPosition) =>
                      this.exerciseType(itemPosition)
                    }
                  >
                    <Picker.Item label="Little to no exercise	" value={1} />
                    <Picker.Item label="Light exercise (1–3 days per week)	" value={2} />
                    <Picker.Item label="Moderate exercise (3–5 days per week)	" value={3} />
                    <Picker.Item label="Heavy exercise (6–7 days per week)	" value={4} />
                    <Picker.Item label="Very heavy exercise (twice per day)	" value={5} />
                  </Picker>
                </TouchableOpacity>

                <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 25, paddingBottom: 5, paddingTop: 10 }}>Meals per day: </Text>
                <TouchableOpacity style={styles.button}>
                  <Picker style={styles.pickerStyle}
                    selectedValue={this.state.selectedMeal}
                    onValueChange={(itemPosition) =>
                      this.mealType(itemPosition)
                    }
                  >
                    <Picker.Item label="3 Meals" value={1} />
                    <Picker.Item label="4 Meals" value={2} />
                    <Picker.Item label="5 Meals" value={3} />
                  </Picker>
                </TouchableOpacity>

                <Text style={{ fontSize: 15, color: "#fff", paddingLeft: 16, paddingBottom: 10 }} numberOfLines={1}>
                  ___________________________________________________
                </Text>

                <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                  <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Calories To Eat(Per Day): ~ </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {(this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie).toFixed(0)} Kcal/day</Text>
                </View>
                {
                  this.state.threeMeal ?
                    <View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Breakfast: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.33)).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Lunch: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.37)).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Dinner: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.30)).toFixed(0)} Kcal/day</Text>
                      </View>
                    </View>
                    : null
                }
                {
                  this.state.fourMeal ?
                    <View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Breakfast: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.28)).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Morning snack: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.08)).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Lunch: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.36)).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Dinner: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * (0.28)).toFixed(0)} Kcal/day</Text>
                      </View>
                    </View>
                    : null
                }
                {
                  this.state.fiveMeal ?
                    <View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Breakfast: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * 0.26).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Morning snack: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * 0.07).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Lunch: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * 0.34).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Afternoon snack: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * 0.07).toFixed(0)} Kcal/day</Text>
                      </View>
                      <View flexDirection='row' style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 18, color: '#fff', paddingLeft: 20 }}>Dinner: ~</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> {((this.state.BMR * this.state.exerciseTypeValue + this.state.Calorie) * 0.26).toFixed(0)} Kcal/day</Text>
                      </View>
                    </View>
                    : null
                }
              </LinearGradient>
            </CardView>
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
    justifyContent: 'center',
    width: 400
  },
  button: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    marginLeft: 20,
    marginBottom: 10,
    paddingVertical: 10
  },
  pickerStyle: {
    height: 25,
    width: "90%",
    color: '#fff',
    justifyContent: 'center',
    marginLeft: 20
  },
  buttonFood: {
    width: 49,
    backgroundColor: 'rgba(255, 255,255,0.15)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 11
  }
});
export default withNavigationFocus(Diet);
