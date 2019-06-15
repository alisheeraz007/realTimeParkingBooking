import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class AvailableSlots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking: false,
        }
    }

    book = (ev) => {
        let obj = {
            booked: "yes"
        }
        let slotsDetails = Object.values(this.props.state.admin.locations[this.props.exactLocation].slotsDetails)
        let slotsKeys = Object.keys(this.props.state.admin.locations[this.props.exactLocation].slotsDetails)
        let firebaseRef = firebase.database().ref().child('wholeData')
        firebaseRef.child("admin").child("locations").child(this.props.exactLocation).child("slotsDetails").child(ev.target.name).update(obj)
        let buttons = document.getElementsByTagName('BUTTON')
        for (let i = 0; i < buttons.length; i++) {
            for (let j = 0; j < slotsDetails.length; j++) {
                if (buttons[i].name === slotsKeys[j] &&
                    slotsDetails[j].booked === "yes"
                    ) {
                        buttons[j].classList += " abc"
                    // console.log(slotsDetails[j].slotNo)
                }
            }
        }
        // console.log(slotsDetails)
    }

    // componentWillMount() {
    //     this.setState({
    //         slots: this.props.state.admin.locations[this.props.exactLocation].slots
    //     }, () => {
    //         // this.slotsMaking()
    //     })
    // }

    render() {
        // console.log(this.props.state.location[1].slotsDetails)
        return (
            <div id='availableSlots' className="availableSlots">
                {this.props.state.location.map((location, index) => {
                    return (
                        this.props.exactLocation === location.exactLocation ?
                            Object.keys(location.slotsDetails).map((slots, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={(ev) => this.book(ev)}
                                        name={'slot' + (index + 1)}
                                        id='slotss'
                                        className='slots'
                                    >
                                        slot{index + 1}
                                    </button>
                                )
                            })
                            : null
                    )
                })}
            </div>
        )
    }

}

export default withRouter(AvailableSlots);