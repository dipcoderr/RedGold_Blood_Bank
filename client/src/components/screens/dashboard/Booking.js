import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import moment from 'moment';
import { UserContext } from '../../../App';
import config from '../../../config';


function Booking() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { state } = useContext(UserContext);
    
    // Get user data from localStorage with error handling
    const getUserData = () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"));
            const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
            const jwt = JSON.parse(localStorage.getItem("jwt"));
            return { userId, isAdmin, jwt };
        } catch (error) {
            console.error("Error parsing user data:", error);
            return { userId: null, isAdmin: false, jwt: null };
        }
    };

    const { userId, isAdmin, jwt } = getUserData();

    useEffect(() => {
        // Only fetch data if user is authenticated
        if (!state || !jwt) {
            return;
        }

        setLoading(true);

        fetch(`${config.API_URL}/api/booking/all`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        })
        .then(res => res.json())
        .then(data2 => { 
            setLoading(false);
            console.log(data2);
            if (data2.data) {
                setData(data2.data);
            }
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }, [state, jwt])

    const deleteBooking = (bookingId) => {
        let confirmDelete = window.confirm("Are you sure, you want to cancel this booking ?");

        if(confirmDelete === false) return;

        console.log("Deleting booking with ID:", bookingId);
        setLoading(true);

        let fetchData = {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            }
        }

        fetch(`${config.API_URL}/api/booking/delete/${bookingId}`, fetchData)
        .then(res => res.json())
        .then(data2 => {
            console.log("Delete response:", data2);
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message);
                if (data2.data) {
                    console.log("Updating booking list with:", data2.data.length, "items");
                    setData(data2.data);
                }
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log("Delete error:", err);
        })
    }

    // Show loading if user context is not ready
    if (!state) {
        return <center><BeatLoader loading={true} size={30} /></center>;
    }


    return (
        <>
            <h2>Bookings</h2><hr />
            {
                (loading)
                    ?
                <center><BeatLoader loading={loading} size={30} /></center>
                    :
                <>
                    {
                        (data.length)
                            ?
                        <div className="table-responsive-sm">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Group</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    (isAdmin)
                                        ?
                                    <tbody>
                                        {
                                            data.map((booking, index) => {
                                                return (
                                                    <tr key={booking._id}>
                                                        <th scope="row">{booking.user.name}</th>
                                                        <td>{booking.user.phone}</td>
                                                        <td>{booking.group}</td>
                                                        <td>{moment(booking.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteBooking(booking._id)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                        :
                                    <tbody>
                                        {
                                            data.map((booking, index) => {
                                                return (
                                                    booking.user._id === userId 
                                                        ?
                                                    <tr key={booking._id}>
                                                        <th scope="row">{booking.user.name}</th>
                                                        <td>{booking.user.phone}</td>
                                                        <td>{booking.group}</td>
                                                        <td>{moment(booking.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteBooking(booking._id)}>Delete</button></td>
                                                    </tr>
                                                        :
                                                    null
                                                )
                                            })
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                            :
                        <p style={{ color: 'red' }}>*No bookings available.</p>
                    }
                </>
            }
        </>
    )
}

export default Booking
