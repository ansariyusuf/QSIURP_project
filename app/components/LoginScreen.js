import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import {Actions, ActionConst} from 'react-native-router-flux';
import SignupSection from './SignupSection';

import Dimensions from 'Dimensions';


export default class LoginScreen extends Component {

   constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

    };
  }

  login = () => {
    console.log(this.state.username);
    console.log(this.state.password);
    Actions.secondScreen();
    fetch('http://10.72.228.139:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comp:'login',
        username: this.state.username,
        password: this.state.password,
      })

    })

    .then((response)=> response.json())
    .then ((res)=>{ 

      if (res.success === true) {
        //AsyncStorage.setItem('user',res.user);
        
        alert('Login successful');
        //Actions.secondScreen();
      }

      else {
        alert (res.message);
      }


    })

    .done();
    
  }


  onChangeText = (e) => {
  if (e.category==='Username'){
    this.state.username=e.text;
  }
  else{
    this.state.password=e.text;
  }

  }

  render() {
    return (
      <Wallpaper>
        <Logo title= {"LoginScreen"}/>
        <Form onChangeText= {this.onChangeText} />
        <ButtonSubmit loginfn={this.login} />
                <SignupSection />

      </Wallpaper>
    );
  }
}


