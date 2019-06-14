import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// import SignInPage from './SignInPage'
// import SignUpPage from './SignUpPage'

class SignInPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signIn: false,
            signUp: true,
        }
    }
    onAuth = () => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let email = user.email;
                let uid = user.uid;
                this.setState({
                    email,
                    uid,
                }, () => {
                    this.props.history.push({
                        pathname: '/MainDashBoard',
                        state: {
                            email: this.state.email,
                            uid: this.state.uid
                        }
                    })
                })
            }
        });
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            // localStorage.setItem("email", this.state.email)
            // localStorage.setItem("password", this.encrypt())
        })
    }

    changePath = () => {
        this.props.history.push('/SignUpPage')
    }

    signIn = (ev) => {
        ev.preventDefault()
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                this.props.history.push({
                    pathname: '/MainDashBoard',
                    state: {
                        email: this.state.email,
                        uid: this.state.uid
                    }
                })
            })
    }


    // encrypt = () => {
    //     let dic = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","0",'1','2','3','4','5','6','7','8','9'];
    //     let dic2 = ["+", "@", "#", "$", "%", "^", "&", "*", "0", "|", "~", "/", ";", ":", "}", "{", "[", "]", "!", "5", "8", "7", "9", "2", "(", ")",'5','8','6','2','1','0','7','3','9','4'];
    //     let encrypt2 = "";
    //     let message = this.state.password;
    //     // console.log(message)
    //     if (message) {

    //         for (let i = 0; i < message.length; i++) {
    //             let indx = dic.indexOf(message[i]);
    //             encrypt2 += dic2[indx]
    //             // console.log(encrypt2);

    //             // console.log(dic2[indx])
    //         }
    //     }
    //     // console.log(encrypt2);
    //     // document.getElementById("message").value = "";
    //     // document.getElementById("text").innerHTML += `<span><button onclick="discrypt()" class="btn">discrypt</button></span>`
    //     return encrypt2;
    // }

    // check=()=>{
    //     let email = localStorage.getItem('email')
    //     let password = localStorage.getItem('password')

    //     if(email && password){
    //             this.props.history.push('/MainDashBoard')
    //         }
    // }


    componentWillMount() {
        this.onAuth()
    }

    render() {
        return (
            <div className="mainConatiner">
                <div className="header">
                    Sign In
                </div>

                <div className="inputDiv">
                    <div className='inputs'>
                        <form onSubmit={(ev) => this.signIn(ev)}>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(ev) => this.gettingValues(ev)}
                                autoFocus
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(ev) => this.gettingValues(ev)}
                                required
                            />
                            <button>Sign In</button>
                        </form>
                        <p>
                            To book a parking place SignUp now<br />
                            <button onClick={this.changePath}>Sign Up Now</button>
                        </p>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignInPage);