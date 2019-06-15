import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timing: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
                , '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
            city: null,
            areaName: null,
            exactLocation: null,
            slots: null,
            from: null,
            to: null,
            locationNumber: null
        }
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    addLocation = (ev) => {
        ev.preventDefault();
        // console.log(this.state.timing.slice(-1)[0])
        // let lastSlotNumber = this.props.state.location.slice(-1)[0]
        // console.log(lastSlotNumber)
        let obj = {
            city: this.state.city,
            areaName: this.state.areaName,
            exactLocation: this.state.exactLocation,
            slots: this.state.slots,
            from: this.state.from,
            to: this.state.to,
            locationNumber: this.state.locationNumber
        }
        firebase.database().ref().child('wholeData').child('admin').child('locations').child(obj.exactLocation).set(obj)
        for (let i = 0; i < obj.slots; i++) {
            let obj2 = {
                booked: "no",
                slotNo: i + 1
            }
            firebase.database().ref().child('wholeData').child('admin').child('locations').child(obj.exactLocation).child('slotsDetails').child(`slot${i + 1}`).set(obj2)
        }
    }

    render() {
        // console.log(this.props.exactLocation)
        return (
            <div className='addLocation'>
                <form onSubmit={(ev) => this.addLocation(ev)}>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={(ev) => this.gettingValues(ev)}
                        required
                        autoFocus
                    />
                    <input
                        type="text"
                        name="areaName"
                        placeholder="Area Name"
                        onChange={(ev) => this.gettingValues(ev)}
                        required
                    />
                    <input
                        type="text"
                        name="exactLocation"
                        placeholder="Exact Location"
                        onChange={(ev) => this.gettingValues(ev)}
                        required
                    />
                    <input
                        type="number"
                        name="slots"
                        placeholder="How Many Slots Want To Add?"
                        onChange={(ev) => this.gettingValues(ev)}
                        required
                    />
                    timing:
                <select onChange={(ev) => this.gettingValues(ev)} name='from'>
                        <option >From</option>
                        {this.state.timing.map((time, index) => {
                            return (
                                <option key={index}>{time}</option>
                            )
                        })}
                    </select>
                    <select onChange={(ev) => this.gettingValues(ev)} name='to'>
                        <option >To</option>
                        {this.state.timing.map((time, index) => {
                            return (
                                <option key={index}>{time}</option>
                            )
                        })}
                    </select>
                    <input
                        type="number"
                        name="locationNumber"
                        placeholder="Location Number"
                        onChange={(ev) => this.gettingValues(ev)}
                        required
                    />
                    <button>Add</button>
                </form>
            </div>
        )
    }

}

export default withRouter(AddLocation);