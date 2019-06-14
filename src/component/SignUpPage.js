import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class SignUpPage extends Component {
    constructor(props) {
        super(props)
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    changePath = () => {
        this.props.history.push('/')
    }

    signUp = (ev) => {
        ev.preventDefault();
        let obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNo: this.state.phoneNo,
            user: "user"
        }
        const firebaseRef = firebase.database().ref()
        firebase.auth().createUserWithEmailAndPassword(obj.email, this.state.password)
            .then((res) => {
                firebaseRef.child("wholeData").child("verification").child(this.state.firstName).set(obj)
                this.props.history.push("/")
            })
            .catch((error) => {
                var errorMessage = error.message;
            });
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="header">
                    Sign Up
                </div>
                <div className="inputDiv">
                    <div className="inputs abc">
                        <form onSubmit={(ev) => this.signUp(ev)}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                onChange={(ev) => this.gettingValues(ev)}
                                autoFocus
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <input
                                type="text"
                                name="phoneNo"
                                placeholder="Phone No."
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <button>Sign Up</button>
                        </form>
                        <p>
                            Already have an account?<br />
                            <button onClick={this.changePath}>Sign In</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUpPage);