import React from 'react';
import PropTypes from 'prop-types';
import FormSignup from './FormSignup';
import Wallpaper from '../Wallpaper';
import ButtonSubmitSignup from './ButtonSubmitSignup';
import Logo from './LogoSignup';
import * as firebase from 'firebase';

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
      Password:'',
      re_enter:'',
    }

    
  }

  data=null;
  root_val=null;

  entire_db=null;
  user_count=null;

//+ this.user_count.toString()
  set_data_1(First_name,Andrew_ID,password,re_enter,val){
        
        this.entire_db=val;
        console.log(this.entire_db);
        if (this.entire_db!==null){
          this.user_count=Object.keys(this.entire_db).length+1;
        }
        else{
          this.user_count=1;
        }
        
        firebase.database().ref('users/00'+this.user_count.toString()).set(
                {
                    username: First_name,
                    password: password,
                    Andrew_ID: Andrew_ID
                }
            ).then(() => {
                console.log('INSERTED !');
            }).catch((error) => {
                console.log(error);
            });
    }

  set_data(First_name,Andrew_ID,password,re_enter, val){
        
        //this.data=val;
        /*console.log(this.data);
        if(this.data!==null){
          alert('User already exists');
        }
        else{*/
          firebase.database().ref('users').on("value",(snapshot)=>{(this.set_data_1(First_name,Andrew_ID,password,re_enter,snapshot.val()))}) 
        //}
    }

  insert(First_name,Andrew_ID,password,re_enter){
        
        //console.log('looking up')
        console.log(firebase.database().ref('users').orderByChild('username').equalTo(First_name).on("value",(snapshot)=>{(this.set_data(First_name,Andrew_ID,password,re_enter,snapshot.val()))}) );
  }

  signupFn = () => {
    alert('Sign Up Successful');

    this.insert(this.state.First_name,this.state.Andrew_Id,this.state.Password,this.state.re_enter);

    /*
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

    .done();*/
  }



  onChangeText = (e) => {
    //console.log(this.state.First_name+' fname');
    //console.log(this.state.Andrew_Id+' andrew');
    //console.log(this.state.password+' pass');
  //console.log('here')
    //console.log(e);
  if (e.category==='Andrew_Id'){
    this.state.Andrew_Id=e.text;
    //console.log(this.state.Andrew_Id+' andrew');
  }
  else if (e.category==='First_name'){
    this.state.First_name=e.text;
    //console.log(this.state.First_name+' fname');
  }
  else if (e.category==='Password'){
    this.state.Password=e.text;
    //console.log(this.state.Password+' pass')
  }
  else {
    this.state.re_enter=e.text;
    //console.log(this.state.re_enter+' re_pass')
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


