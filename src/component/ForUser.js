import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ForUser extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log(this.props.state)
        return (
            <div>
                {this.props.state.users.map((user,index) => {
                    return (
                        user.email === this.props.email ?
                            <div key={index} className="dataa">
                                <div className='data'>
                                    <button>Book Slot</button>
                                    <button>Booking History</button>
                                    <button>Edit Booking</button>
                                </div>
                                <div>
                                    {/* <BookSlot />
                                    <BookingHistory />
                                    <EditBooking /> */}
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