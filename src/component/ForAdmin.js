import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ForAdmin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div className="dataa">

                <div className='data'>
                    <button>Users</button>
                    <button>Add Location</button>
                    <button>View Locations</button>
                </div>
                <div>
                    {/* <Users /> */}
                    {/* <AddLocation /> */}
                    {/* <ViewLocation /> */}
                </div>
            </div>
        )
    }

}

export default withRouter(ForAdmin);