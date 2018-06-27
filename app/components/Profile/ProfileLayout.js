import React from 'react';
import { StyleSheet, Text, View, 
  TextInput, 
  KeyboardAvoidingView, 
  TouchableOpacity,
    AsyncStorage} from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'


import { Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

import Profile1 from '../../../screens/Profile1'
import Profile2 from '../../../screens/Profile2'
import Profile3 from '../../../screens/Profile3'
import Profile4 from '../../../screens/Profile4'

import Product1 from '../../../screens/Product1'

import Options from '../../../screens/Profile3/Options'



const Profile1Stack = createStackNavigator(
  {
    profile: {
      screen: Profile1,
      path: '/',
    },
    options: {
      screen: Options,
      path: '/',
    },
  },
  {
    mode: 'card',
  }
)

const Profile2Stack = createStackNavigator(
  {
    profile: {
      screen: Profile2,
      path: '/',
    },
    options: {
      screen: Options,
      path: '/',
    },
  },
  {
    mode: 'card',
  }
)

const Profile3Stack = createStackNavigator(
  {
    profile: {
      screen: Profile3,
      path: '/',
    },
    options: {
      screen: Options,
      path: '/',
    },
  },
  {
    mode: 'card',
  }
)

const Profile4Stack = createStackNavigator(
  {
    profile: {
      screen: Profile4,
      path: '/',
    },
    options: {
      screen: Options,
      path: '/',
    },
  },
  {
    mode: 'card',
  }
)

const Product1Stack = createStackNavigator(
  {
    profile: {
      screen: Product1,
      path: '/',
    },
  },
  {
    mode: 'card',
  }
)

const test = ({ focused, tintColor }) => (
  <Icon
    name="circle"
    type="entypo"
    size={26}
    color={focused ? tintColor : 'gray'}
  />
)

const HomeIcon= ({ focused, tintColor }) => (
  <Icon
    reverse
    name='home'
    type="entypo"
    size={26}
    color={focused ? tintColor : 'red'}
      //type='MaterialCommunityIcons'

  />
)

  const ProfileIcon= 
  ({ focused, tintColor }) => (
  <Icon
    reverse
    name='baidu'
    type="entypo"
    size={26}
    color={focused ? tintColor : 'red'}
      //type='MaterialCommunityIcons'

  />
)

  const GroupIcon= 
  ({ focused, tintColor }) => (
  <Icon
    reverse
    name='group'
    size={26}
    color={focused ? tintColor : 'red'}
      //type='MaterialCommunityIcons'

  />
)

const RootTabs = createBottomTabNavigator(
  {
    profile1: {
      screen: Profile1Stack,
      navigationOptions: {
        tabBarLabel: 'Profile1',
        tabBarIcon: ProfileIcon,
      },
    },
    profile2: {
      screen: Profile2Stack,
      navigationOptions: {
        tabBarLabel: 'Profile2',
        tabBarIcon: HomeIcon,
      },
    },

    profile4: {
      screen: Profile4Stack,
      navigationOptions: {
        tabBarLabel: 'Profile4',
        tabBarIcon: GroupIcon,
      },
    },


  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'black' : 'gray',
      showLabel: false,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      labelStyle: {
        fontSize: 12,
      },
      iconStyle: {
        width: 30,
        height: 30,
      },
      style: {
        backgroundColor: 'white',
        justifyContent: 'center',
      },
    },
    tabBarPosition: 'bottom',
    initialRouteName: 'profile1',
  }
)

HomeIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  tintColor: PropTypes.string.isRequired,
}

export default class ProfileLayout extends React.Component {
  render() {
    return (
      <RootTabs/>
    );
  }
}