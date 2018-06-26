import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import {Actions, ActionConst} from 'react-native-router-flux';
import SignupSection from './SignupSection';
//import FirebaseBackend from '../../backend';
import * as firebase from 'firebase';

import {
  AsyncStorage
} from 'react-native'

import Dimensions from 'Dimensions';


export default class LoginScreen extends Component {

   constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',

    };
    firebase.initializeApp({
        apiKey: "AIzaSyBCPe7SKvGizhuDoQACUM8bvpPzm1MJ8HQ",
        authDomain: "qsiurp2018-24c40.firebaseapp.com",
        databaseURL: "https://qsiurp2018-24c40.firebaseio.com",
        projectId: "qsiurp2018-24c40",
        storageBucket: "qsiurp2018-24c40.appspot.com",
        messagingSenderId: "522755047583"
    });
  }

    data=null;
    root_val=null;

    async set_data(username,password,val){
        
        this.data=val;
        //console.log(this.data);
        this.root_val= Object.values(this.data)[0];


        if (this.data!==null){
            if (this.root_val.password===password){
                console.log('success');

               // const setting= AsyncStorage.setItem('user_data', JSON.stringify(this.root_val));
               try{
                    await AsyncStorage.setItem('user_data',JSON.stringify(this.root_val))
                }
                catch(error){
                    console.log('in set');
                    console.log(error)
                }
               //this.getData();

                console.log('after sync');
                Actions.secondScreen();
                
            }
            else{
                console.log('wrong password');
                return ('wron password');
            }
        }
        else{
            console.log('user not found');
            return('user not found');
        }
    }


    set_async= async(val)=> {
      try{
          await AsyncStorage.setItem('user_data',val)
      }
      catch(error){
          console.log('in set');
          console.log(error)
      }
    }

    
    
    
       
    
  

    lookup(username,password){
        
        console.log('looking up')
        console.log(firebase.database().ref('users').orderByChild('username').equalTo(username).on("value",(snapshot)=>{(this.set_data(username,password,snapshot.val()))}) );
  }

  login = () => {
    console.log(this.state.username);
    console.log(this.state.password);
    //Actions.secondScreen();
    this.lookup(this.state.username,this.state.password);
    /*
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

    .done();*/
    
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


