import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ViewLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    deleteLocation=(ev)=>{
        ev.preventDefault();
        firebase.database().ref().child('wholeData').child('admin').child('locations').child(ev.target.name).remove()
    }

    viewslots=(ev)=>{
        this.props.viewSlots(ev.target.name)
        // console.log(ev.target.name)
    }

    render() {
        // console.log(this.props.email)
        return (
            this.props.state.location ?
                <div className='viewLocation'>
                    {this.props.state.location.map((location, index) => {
                        return (
                            <div key={index}>
                                    <span>{index+1}</span>
                                    {location.exactLocation},<br />
                                    {location.areaName},<br />
                                    {location.city}.<br />
                                <input
                                    type="button"
                                    value="Delete"
                                    onClick={(ev)=>this.deleteLocation(ev)}
                                />
                                <input
                                    onClick={(ev)=>this.viewslots(ev)}
                                    type="button"
                                    value="View Slots"
                                    name={location.exactLocation}
                                />
                            </div>
                        )
                    })}
                </div>
                : null
        )
    }

}

export default withRouter(ViewLocation);