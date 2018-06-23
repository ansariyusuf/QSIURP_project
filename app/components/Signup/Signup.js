import React from 'react';
import PropTypes from 'prop-types';
import FormSignup from './FormSignup';
import Wallpaper from '../Wallpaper';
import ButtonSubmitSignup from './ButtonSubmitSignup';
import Logo from './LogoSignup';

import {Actions, ActionConst} from 'react-native-router-flux';
import Dimensions from 'Dimensions';



import { createStackNavigator } from 'react-navigation';



import { StyleSheet, Text, View, ImageBackground,
  TextInput, 
  KeyboardAvoidingView, 
  TouchableOpacity,
  AsyncStorage} from 'react-native';



export default class SIgnup extends React.Component {

   constructor(props) {
    super(props);
    this.state ={
      comp:'signup',
      Andrew_Id: '',
      First_name:'',
      password:'',
      re_enter:'',
    }
  }

  signupFn = () => {
    alert('Sign Up Successful');

    fetch('http://192.168.2.80:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comp:'signup',
        First_name: this.state.First_name,
        Andrew_ID: this.state.Andrew_Id,
        password: this.state.password,
      })

    })

    .then((response)=> response.json())
    .then ((res)=>{ 

      if (res.success === true) {
        //AsyncStorage.setItem('user',res.user);
        //this.props.navigation.navigate('Profile');
        Actions.loginScreen();
        alert('Signup Successful');
      }

      else {
        alert (res.message);
      }

    })

    .done();
  }



  onChangeText = (e) => {
  if (e.category==='Andrew_Id'){
    this.state.Andrew_Id=e.text;
  }
  else if (e.category==='First_name'){
    this.state.First_name=e.text;
  }
  if (e.category==='Password'){
    this.state.Password=e.text;
  }
  else {
    this.state.re_enter=e.text;
  }

  }

  
  render() {
    return (
      <Wallpaper>
        <Logo title= {"SignupScreen"}/>

        <FormSignup onChangeText= {this.onChangeText} />
        <ButtonSubmitSignup signupFn={this.signupFn} />
      </Wallpaper>
    );
  }
}


