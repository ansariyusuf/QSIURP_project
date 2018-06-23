import firebase from 'firebase';

class FirebaseBackend{

    // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
        apiKey: "AIzaSyBCPe7SKvGizhuDoQACUM8bvpPzm1MJ8HQ",
        authDomain: "qsiurp2018-24c40.firebaseapp.com",
        databaseURL: "https://qsiurp2018-24c40.firebaseio.com",
        projectId: "qsiurp2018-24c40",
        storageBucket: "",
        messagingSenderId: "522755047583"
    });
    
  }

        

    insert(){
            console.log('In the backend')
            firebase.database().ref('users/001').set(
                {
                    name: 'Yusuf',
                    age: 20
                }
            ).then(() => {
                console.log('INSERTED !');
            }).catch((error) => {
                console.log(error);
            });
        }

   

}
export default new FirebaseBackend();