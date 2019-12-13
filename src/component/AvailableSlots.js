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
            book: false
        }
    }

    book = (ev) => {
        let obj = {
            booked: "yes",
            bookedBy: this.props.email,
            from: this.props.state1.from,
            to: this.props.state1.to,
            year: this.props.state1.date.slice(0, 4),
            month: this.props.state1.date.slice(5, 7),
            date: this.props.state1.date.slice(8)
        }
        let slotsDetails = Object.values(this.props.state.admin.locations[this.props.exactLocation].slotsDetails)
        let slotsKeys = Object.keys(this.props.state.admin.locations[this.props.exactLocation].slotsDetails)
        let firebaseRef = firebase.database().ref().child('wholeData')
        firebaseRef.child("admin").child("locations").child(this.props.exactLocation).child("slotsDetails").child(ev.target.name).child("bookingDetails").child(obj.bookedBy.slice(0, 6)).set(obj)
        // console.log(slotsDetails)
    }

    // check = (slotNo) => {
    //     let slots = this.props.state.admin.locations[this.props.exactLocation].slotsDetails[slotNo].booked;
    //     // console.log(slots)
    //     if (slots === 'yes') {
    //         let button = document.getElementById("slot1")
    //         console.log(button)
    //     }
    // }

    componentWillMount() {
        //    let date = new Date()
        //    console.log(date.toDateString())
    }

    render() {
        return (
            <div id='availableSlots' className="availableSlots">
                <h3>{this.props.exactLocation}</h3>
                {this.props.state.location.map((location, index) => {
                    return (
                        this.props.exactLocation === location.exactLocation ?
                            Object.values(location.slotsDetails).map((slots, index) => {
                                return (
                                    <div key={index + 1}>
                                        {slots.bookingDetails ? null :
                                            <button
                                                key={index}
                                                onClick={(ev) => this.book(ev)}
                                                name={'slot' + (index + 1)}
                                                id={'slot' + (index + 1)}
                                                className='slots'
                                            >
                                                {slots.slotNo}
                                            </button>
                                        }
                                        {slots.bookingDetails ?
                                            Object.values(slots.bookingDetails).map((details) => {
                                                return (
                                                    this.props.state1.date.slice(8) === details.date
                                                        ?
                                                        this.props.state1.from < details.from &&
                                                            this.props.state1.to < details.from
                                                            ||
                                                            this.props.state1.from > details.to &&
                                                            this.props.state1.to > details.to
                                                            ?
                                                            <button
                                                                key={index}
                                                                onClick={(ev) => this.book(ev)}
                                                                name={'slot' + (index + 1)}
                                                                id={'slot' + (index + 1)}
                                                                className='slots'
                                                            >
                                                                {slots.slotNo}
                                                            </button>
                                                            : null
                                                        : null
                                                )
                                            })
                                            : null}
                                        {slots.bookingDetails ?
                                            Object.values(slots.bookingDetails).map((details) => {
                                                return (
                                                    this.props.state1.date.slice(8) === details.date
                                                        &&
                                                        (this.props.state1.from === details.from &&
                                                            this.props.state1.to === details.to
                                                            ||
                                                            this.props.state1.from >= details.from &&
                                                            this.props.state1.to <= details.to
                                                            ||
                                                            this.props.state1.from <= details.from &&
                                                            this.props.state1.to >= details.to
                                                            ||
                                                            this.props.state1.from <= details.from &&
                                                            this.props.state1.to <= details.to &&
                                                            this.props.state1.to >= details.from
                                                            ||
                                                            this.props.state1.from >= details.from &&
                                                            this.props.state1.to >= details.to &&
                                                            this.props.state1.from <= details.to)
                                                        ?
                                                        <button
                                                            key={index + 2}
                                                            onClick={(ev) => this.book(ev)}
                                                            name={'slot' + (index + 1)}
                                                            id='slotss'
                                                            className='slots booked'
                                                            disabled
                                                        >
                                                            {slots.slotNo}
                                                        </button>
                                                        : null
                                                )
                                            })
                                            : null}
                                    </div>
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