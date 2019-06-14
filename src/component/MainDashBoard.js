import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ForUser from './ForUser'
import ForAdmin from './ForAdmin'

class MainDashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null
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
                })
            } else {
                this.props.history.push('/')
            }
        });
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
            // localStorage.clear()
            this.props.history.push('/')
        }).catch((error) => {
            // console.log(error)
        });
    }

    // discrypt = () => {
    //     let dic = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    //     let dic2 = ["+", "@", "#", "$", "%", "^", "&", "*", "o", "|", "~", "/", ";", ":", "}", "{", "[", "]", "!", "t", "d", 'a', "c", "5", "(", ")", '5', '8', '6', '2', '1', '0', '7', '3', '9', '4'];
    //     let password = ""
    //     let messege = localStorage.getItem('password')
    //     // console.log(messege)
    //     if (messege) {
    //         for (let i = 0; i < messege.length; i++) {
    //             let indx = dic2.indexOf(messege[i]);
    //             password += dic[indx];
    //         }
    //         this.setState({
    //             password,
    //         })
    //     } else {
    //         this.props.history.push('/')
    //     }
    // }

    componentWillMount() {
        // this.onAuth()
        // let email = localStorage.getItem("email")
        // this.discrypt()
        // if (email) {
        //     this.setState({
        //         email,
        //     })
        // } else {
        //     this.props.history.push('/')
        // }
    }

    render() {
        // console.log(this.props.location.state.email)
        return (
            this.props.state.admin && this.props.state.users ?
                <div className="mainContainer">
                    {this.props.state.admin.email === this.state.email
                        ||
                        this.props.state.users.map((user) => {
                            return (
                                user.email === this.state.email
                            )
                        }) ?
                        <div>
                            <div className="header">
                                {this.props.state.admin ?
                                    this.props.location.state.email === this.props.state.admin.email ?
                                        'Admin Pannel Page'
                                        : null
                                    : null}
                                {this.props.state.users ?
                                    this.props.state.users.map((user) => {
                                        return (
                                            this.props.location.state.email === user.email ?
                                                "User Pannel Page"
                                                : null
                                        )
                                    })
                                    : null}
                            </div>
                            <button onClick={this.signOut}>signOut</button>
                        </div>
                        : null}
                    <div>
                        {this.props.state.admin ?
                            this.props.location.state.email === this.props.state.admin.email ?
                                <ForAdmin email={this.props.location.state.email} state={this.props.state} />
                                : null
                            : null}
                        {this.props.state.users ?
                            this.props.state.users.map((user,index) => {
                                return (
                                    this.props.location.state.email === user.email ?
                                        <ForUser key={index} email={user.email} state={this.props.state}/>
                                        : null
                                )
                            })
                            : null}
                    </div>
                </div>
                : null
        )
    }
}

export default withRouter(MainDashBoard);