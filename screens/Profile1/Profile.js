import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native'
import PropTypes from 'prop-types'

import mainColor from './constants'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'

import ProfileIcon from './ProfileIcon'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class Contact extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    tels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  UserInfo=null;






   componentDidMount() {
      /*try{
           AsyncStorage.setItem('user_data',"Hi")
        }
      catch(error){
           console.log('in set');
           console.log(error)
          }*/



          this.getData().then((data)=>{this.UserInfo=JSON.JSON.parse(data);
          console.log(this.UserInfo);

          this.setState({
        isLoading: true
      });


      });


  }


  async getData () {
    return AsyncStorage.getItem('user_data')

  }







  

  state = {
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.tels),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.emails),

    isLoading: false

  }

  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }





     




  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = this.props



    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: avatarBackground,
          }}
        >

          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: avatar,
              }}
            />
                                                                  <ProfileIcon/>


            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
      }}
    />
  )

  renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  )

  render() {
    //this.get_data();

if (this.state.isLoading) {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}

            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}

          </Card>
        </View>
      </ScrollView>
    )
}

return <View><Text> "hi" </Text> </View>



  }


}

export default Contact