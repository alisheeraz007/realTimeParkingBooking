import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import AddLocation from './AddLocation'
import ViewLocation from './ViewLocation'
import Users from './Users'
import ViewSlots from './ViewSlots'

class ForAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AddLocation: false,
            ViewLocation: false,
            Users: true,
            ViewSlots: false
        }
    }

    addLocation = () => {
        this.setState({
            AddLocation: true,
            ViewLocation: false,
            Users: false,
            ViewSlots: false
        })
    }

    viewLocation = () => {
        this.setState({
            AddLocation: false,
            ViewLocation: true,
            Users: false,
            ViewSlots: false
        })
    }

    users = () => {
        this.setState({
            AddLocation: false,
            ViewLocation: false,
            Users: true,
            ViewSlots: false
        })
    }

    viewSlots = (name) => {
        // console.log(name)
        this.setState({
            AddLocation: false,
            ViewLocation: false,
            Users: false,
            ViewSlots: true,
            exactLocation: name,
        })
    }

    render() {
        // console.log(this.props.email)
        return (
            <div className="dataa">

                <div className='data'>
                    <button onClick={this.users}>Users</button>
                    <button onClick={this.addLocation}>Add Location</button>
                    <button onClick={this.viewLocation}>View Locations</button>
                </div>
                <div>
                    {this.state.Users ?
                        <Users
                            state={this.props.state}
                            email={this.props.email}
                        />
                        : null}
                    {this.state.AddLocation ?
                        <AddLocation
                            state={this.props.state}
                            email={this.props.email}
                        />
                        : null}
                    {this.state.ViewLocation ?
                        <ViewLocation
                            viewSlots={this.viewSlots}
                            state={this.props.state}
                            email={this.props.email}
                        />
                        : null}
                    {this.state.ViewSlots ?
                        <ViewSlots
                            exactLocation={this.state.exactLocation}
                            state={this.props.state}
                            email={this.props.email}
                        />
                        : null}
                </div>
            </div>
        )
    }

}

export default withRouter(ForAdmin);