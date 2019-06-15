import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class BookSlot extends Component{
    constructor(props){
        super(props);
    }

    bookaSlot=(ev)=>{
        this.props.bookaSlot(ev.target.name)
    }

    render(){
        // console.log(this.props)
        return(
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
                                    onClick={(ev)=>this.bookaSlot(ev)}
                                    className="bookSlot"
                                    type="button"
                                    value="Book A Slot"
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

export default BookSlot;