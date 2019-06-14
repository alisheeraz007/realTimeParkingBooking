import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class AddLocation extends Component {
    constructor(props) {
        super(props)
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    name="areaName"
                    placeholder="Area Name"
                    onChange={(ev) => this.gettingValues(ev)}
                    required
                    autoFocus
                />
            </div>
        )
    }

}