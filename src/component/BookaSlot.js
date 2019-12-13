import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class BookaSlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timing: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
                , '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
        }
    }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, () => {
            // if(this.state.from[0] === "0"){
            //     console.log(this.state.from.slice(1,2))
            // }
        })
    }

    availableSlots=(ev)=>{
        ev.preventDefault();
        this.props.availableSlots(this.state.from,this.state.to,this.state.date)
    }

    render() {
        // console.log(this.props)
        return (
            this.props.exactLocation?
            <div className='bookaSlot'>
                <h3>{this.props.exactLocation}</h3>
                <form>
                    Date: <input
                        type='date'
                        onChange={(ev) => this.gettingValues(ev)}
                        name="date"
                    /><br/>
                    Time:
                    <select onChange={(ev) => this.gettingValues(ev)} name="from">
                        <option>From</option>
                        {this.state.timing.map((time, index) => {
                            return (
                                <option key={index}>{time}</option>
                            )
                        })}
                    </select>
                    <select onChange={(ev) => this.gettingValues(ev)} name="to">
                        <option>To</option>
                        {this.state.timing.map((time, index) => {
                            return (
                                <option key={index}>{time}</option>
                            )
                        })}
                    </select>
                    <button onClick={(ev)=>this.availableSlots(ev)}>View Available Slots</button>
                </form>
            </div>
            :null
        )
    }

}

export default withRouter(BookaSlot);