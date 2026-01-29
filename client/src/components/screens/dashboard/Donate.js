import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import moment from 'moment';
import { UserContext } from '../../../App';
import config from '../../../config';

function Donate() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
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

        fetch(`${config.API_URL}/api/appointment/all`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        })
        .then(res => res.json())
        .then(data2 => { 
            setLoading(false);
            console.log(data2.data);
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

    const deleteAppointment = (appointmentId) => {
        let confirmDelete = window.confirm("Are you sure, you want to cancel this appointment ?");

        if(confirmDelete === false) return;
 
        setLoading(true);

        let fetchData = {
            method: "delete",
            headers: {
                "Authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            }
        }

        fetch(`${config.API_URL}/api/appointment/delete/${appointmentId}`, fetchData)
        .then(res => res.json())
        .then(data2 => {
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message);
                if (data2.data) {
                    setData(data2.data);
                }
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }

    const donateBlood = () => {
        if (!userId || !jwt) {
            toast.error('Please login to donate blood');
            return;
        }

        setLoading(true);

        let data = {
            userId
        }

        let fetchData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + jwt,
                "Content-Type": "application/json"
            }
        }

        fetch(`${config.API_URL}/api/appointment/new`, fetchData)
        .then(res => res.json())
        .then(data2 => {
            if(data2.error) {
                toast.error(data2.error)
            }
            else {
                toast.success(data2.message);
                if (data2.data) {
                    setData(data2.data);
                }
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            toast.error('Something went wrong');
            console.log(err);
        })
    }

    // Show loading if user context is not ready
    if (!state) {
        return <center><BeatLoader loading={true} size={30} /></center>;
    }

    return (
        <>
            {
                (isAdmin)
                    ?
                <></>
                    :
                <>
                    <div className="card col-lg-8 mx-auto">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-8 col-sm-12">
                                    <center><p className="lead"><i>Become a donor and save a life!</i> </p></center>
                                </div>
                                <div className="col-lg-4 col-sm-12">
                                    <center><button className="btn btn-outline-danger" onClick={() => donateBlood()}>Donate</button></center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </>
            }
            
            <h2>Appointments</h2><hr />
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
                                        <th scope="col">Address</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    (isAdmin)
                                        ?
                                    <tbody>
                                        {
                                            (data.length)
                                                ?
                                            data.map((appointment, index) => {
                                                return (
                                                    <tr key={appointment._id}>
                                                        <th scope="row">{appointment.user.name}</th>
                                                        <td>{appointment.user.phone}</td>
                                                        <td>{appointment.user.address}</td>
                                                        <td>{moment(appointment.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteAppointment(appointment._id)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                                :
                                            null
                                        }
                                    </tbody>
                                        :
                                    <tbody>
                                        {
                                            (data.length)
                                                ?
                                            data.map((appointment, index) => {
                                                return (
                                                    appointment.user._id === userId 
                                                        ?
                                                    <tr key={appointment._id}>
                                                        <th scope="row">{appointment.user.name}</th>
                                                        <td>{appointment.user.phone}</td>
                                                        <td>{appointment.user.address}</td>
                                                        <td>{moment(appointment.date).format('ll')}</td>
                                                        <td><button className="btn btn-outline-dark" onClick={() => deleteAppointment(appointment._id)}>Delete</button></td>
                                                    </tr>
                                                        :
                                                    null
                                                )
                                            })
                                                :
                                            null
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                            :
                        <p style={{ color: 'red' }}>*No appointments available.</p>
                    }
                </>
            }
            <br />
        </>
    )
}

export default Donate