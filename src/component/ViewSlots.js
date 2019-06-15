import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ViewSlots extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slots: null
        }
    }

    // slotsMaking = () => {
    //     let slots = document.getElementById('slots')
    //     for(let i = 0; i < Number(this.state.slots); i++){
    //         slots.innerHTML += `<button class='slots'>Slot No ${i+1}</button>`
    //         // console.log(slots)
    //     }
    //     // return slots
    // }

    componentWillMount() {
        this.setState({
            slots: this.props.state.admin.locations[this.props.exactLocation].slots
        }, () => {
            // this.slotsMaking()
        })
    }

    render() {
        // console.log(this.state.slots)
        return (
            this.state.slots ?
                <div id='slots' className="viewSlots">
                    <h3>{this.props.exactLocation}</h3>
                    {this.props.state.location.map((location, index) => {
                        return (
                            this.props.exactLocation === location.exactLocation ?
                                Object.keys(location.slotsDetails).map((slots, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={(ev) => this.abc(ev)}
                                            name={'slot' + (index + 1)} id='slotss'
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
                : null
        )
    }

}
export default withRouter(ViewSlots);