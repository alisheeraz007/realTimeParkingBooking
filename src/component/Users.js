import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Users extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            this.props.state.users ?
            <div className='users'>
                {this.props.state.users.map((user,index)=>{
                    return(
                        <button key={index}>
                            <p>{user.firstName}</p>
                        </button>
                    )
                })}
            </div>
            :null
        )
    }

}

export default Users;