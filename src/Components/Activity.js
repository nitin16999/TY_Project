import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, AsyncStorage, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import qs from 'qs';
import config from '../config/config' 
import moment from 'moment';
import { withNavigationFocus } from 'react-navigation';

class Activity extends React.Component {

  state = {
    data: null,
    date: null,
    stpes: null
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
        console.log(event);
        const [, query_string] = event.match(/\#(.*)/);
        console.log(query_string);
        const query = qs.parse(query_string);
        console.log(`query: ${JSON.stringify(query)}`);
        let token = query.access_token;
        await AsyncStorage.setItem("token", token)
      }
    }
  }

  getData = () => {
    console.disableYellowBox = true;
    today = moment().format('YYYY-MM-DD')
    fetch('https://api.fitbit.com/1.2/user/-/activities/tracker/steps/date/' + this.state.date + '/' + today + '.json', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.data}`,
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log(`res: ${JSON.stringify(res)}`);
        // console.log(`res: ${JSON.parse(res)}`);
        this.setState({
          stpes: `${JSON.stringify(res)}`
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
        data: Access_Token
      })
      this.getData()
    }
  }
  render() {
    return (
      <LinearGradient colors={["#232f34", '#2e3e50', '#2e3e50']} style={styles.container} >
        <StatusBar backgroundColor="#232f34" barStyle="light-content" />
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.container}>
            <Text style={{ color: '#fff' }}>{this.state.data}</Text>
            <Text style={{ color: '#fff' }}>{this.state.stpes}</Text>
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
    marginVertical: 12,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center'
  }
});


export default withNavigationFocus(Activity);
