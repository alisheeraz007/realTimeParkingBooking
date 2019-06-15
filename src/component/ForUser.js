import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import BookSlot from './BookSlot'
import BookaSlot from './BookaSlot'
import AvailableSlots from './AvailableSlots'

class ForUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BookSlot: true,
            EditBooking: false,
            BookingHistory: false,
            BookaSlot: false,
            AvailableSlots: false
        }
    }

    bookSlot = () => {
        this.setState({
            BookSlot: true,
            EditBooking: false,
            BookingHistory: false,
            BookaSlot: false,
            AvailableSlots: false,
        })
    }

    editBooking = () => {
        this.setState({
            BookSlot: false,
            EditBooking: true,
            BookingHistory: false,
            BookASlot: false,
            AvailableSlots: false,
        })
    }

    bookingHistory = () => {
        this.setState({
            BookSlot: false,
            EditBooking: false,
            BookingHistory: true,
            BookASlot: false,
            AvailableSlots: false,
        })
    }

    bookaSlot = (name) => {
        this.setState({
            BookSlot: false,
            EditBooking: false,
            BookingHistory: false,
            BookaSlot: true,
            AvailableSlots: false,
            exactLocation: name
        })
    }

    availableSlots = () => {
        this.setState({
            BookSlot: false,
            EditBooking: false,
            BookingHistory: false,
            BookaSlot: false,
            AvailableSlots: true
        })
    }

    render() {
        // console.log(this.props.state)
        return (
            <div>
                {this.props.state.users.map((user, index) => {
                    return (
                        user.email === this.props.email ?
                            <div key={index} className="dataa">
                                <div className='data'>
                                    <button onClick={this.bookSlot}>Book Slot</button>
                                    <button onClick={this.editBooking}>Booking History</button>
                                    <button onClick={this.bookingHistory}>Edit Booking</button>
                                </div>
                                <div>
                                    {this.state.BookSlot ?
                                        <BookSlot
                                            bookaSlot={this.bookaSlot}
                                            state={this.props.state}
                                            email={this.props.email}
                                        />
                                        : null}
                                    {/* {this.state.AddLocation ?
                                        <EditBooking
                                            state={this.props.state}
                                            email={this.props.email}
                                        />
                                        : null}
                                    {this.state.ViewLocation ?
                                        <BookingHistory
                                            state={this.props.state}
                                            email={this.props.email}
                                        />
                                        : null} */}
                                    {this.state.BookaSlot ?
                                        <BookaSlot
                                            availableSlots={this.availableSlots}
                                            exactLocation={this.state.exactLocation}
                                            state={this.props.state}
                                            email={this.props.email}
                                        />
                                        : null}
                                    {this.state.AvailableSlots ?
                                        <AvailableSlots
                                            availableSlots={this.availableSlots}
                                            exactLocation={this.state.exactLocation}
                                            state={this.props.state}
                                            email={this.props.email}
                                        />
                                        : null}
                                </div>
                            </div>
                            : null
                    )
                })}
            </div>
        )
    }

}

export default withRouter(ForUser);