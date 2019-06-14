import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebaseConfig from './config/config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './all.css';

import SignInPage from './component/SignInPage';
import SignUpPage from './component/SignUpPage';
import MainDashBoard from './component/MainDashBoard';

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      admin: null,
      users: null
    }
  }

  gettingValues = () => {
    firebase.database().ref('wholeData').on('value', (snap) => {
      if (snap.val()) {
        if (snap.val().admin) {
          let admin = snap.val().admin
          this.setState({
            admin,
          })
        }
        if (snap.val().verification) {
          let users = Object.values(snap.val().verification)
          this.setState({
            users,
          })
        }
      }
    })
  }

  signUp = () => {
    let password = "123456"
    let obj = {
      firstName: "admin",
      lastName: "admin",
      email: "adminadmin007@gmail.com",
      user: "admin"
    }
    const firebaseRef = firebase.database().ref()
    firebase.auth().createUserWithEmailAndPassword(obj.email, password)
      .then((res) => {
        firebaseRef.child("wholeData").child(obj.firstName).set(obj)
      })
      .catch((error) => {
        alert(error)
      });
  }

  componentWillMount() {
    this.gettingValues()
    firebase.database().ref('wholeData').child('admin').on('value', (snap) => {
      // console.log(snap.val())
      if (snap.val()) {
        return
      } else {
        this.signUp()
      }
    })
  }

  render() {
    return (
      <div>
        <Router>

          <Route
            exact path="/"
            render={() => <SignInPage
              state={this.state}
            // authStateChange={this.authStateChange}
            />} />

          <Route
            path="/SignUpPage"
            render={() => <SignUpPage
              state={this.state}
            // authStateChange={this.authStateChange}
            />} />

          <Route
            path="/MainDashBoard"
            render={() => <MainDashBoard
              state={this.state}
              signUp={this.signUp}
            // authStateChange={this.authStateChange}
            />} />

        </Router>
      </div>
    )
  }

}

export default App;
