import React, { useContext } from 'react';
import { UserContext } from '../../App';
import BeatLoader from "react-spinners/BeatLoader";
import Booking from './dashboard/Booking';
import Donate from './dashboard/Donate';

function Dashboard() {
    const { state } = useContext(UserContext);

    // Show loading while user context is being initialized
    if (!state) {
        return (
            <div className="container col-lg-8 my-4">
                <center><BeatLoader loading={true} size={30} /></center>
            </div>
        );
    }

    return (
        <div className="container col-lg-8 my-4">
            <Donate />
            <Booking />
        </div>
    )
}

export default Dashboard
