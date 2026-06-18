import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../common/Breadcrumbs'
import Appointment from '../common/Appointment'
import axios from 'axios'
import BASE_URL from '../config'
import { Link, useLocation } from 'react-router-dom'
import CheckToken from '../utils/CheckToken'

function MyBookings() {
    return (
        <div>
            <MyBookingsContent />
        </div>
    )
}

function MyBookingsContent() {
    return (
        <>
            <Breadcrumbs title="My Bookings" />
            <MyBookingsCard />
            <Appointment />
        </>
    )
}

function MyBookingsCard() {
    let user_id = useLocation().pathname.split("/")[2]
    console.log(user_id)
    let [bookings, SetBookings] = useState([])
    let [loading, SetLoading] = useState(true)
    let [error, SetError] = useState("")

    async function FetchBookings() {
        try {
            let res = await axios.get(`${BASE_URL}/api/getbookings/${user_id}`, {
                headers: {
                    Authorization: "bearer " + CheckToken()
                }
            })
            console.log(res.data)
            SetBookings(res.data.getBookings)
        } catch (error) {
            SetError(
                error.response?.data?.message ||
                error.message
            )
        } finally {
            SetLoading(false)
        }
    }

    useEffect(() => {
        FetchBookings();
    }, []
    )

    if (error) return <h2>{error}</h2>
    return (
        <>
            <section className="section-spacing">
                <div className="container">
                    <div className="row">
                        {
                            bookings ? (
                                bookings.map((booking) => (
                                    <div className="col-md-6 col-lg-4 mb-4 mr-4" key={booking._id}>

                                        <div className="card shadow-sm h-100 border-0">

                                            <div className="card-body">

                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h5 className="mb-0 mr-2">
                                                        #{booking._id}
                                                    </h5>

                                                    <span
                                                        className={`badge ${booking.booking_status === "Completed"
                                                            ? "badge-success"
                                                            : booking.booking_status === "Pending"
                                                                ? "badge-warning"
                                                                : booking.booking_status === "Cancelled"
                                                                    ? "badge-danger"
                                                                    : "badge-primary"
                                                            }`}
                                                    >
                                                        {booking.booking_status}
                                                    </span>
                                                </div>

                                                <h6 className="font-weight-bold">
                                                    {booking.service_name}
                                                </h6>

                                                <p className="mb-2 text-muted">
                                                    <i className="fa fa-calendar mr-2"></i>
                                                    {booking.booking_date}
                                                </p>

                                                <p className="mb-2 text-muted">
                                                    <i className="fa fa-clock-o mr-2"></i>
                                                    {booking.time_slot}
                                                </p>

                                                <p className="mb-3">
                                                    <strong>Total:</strong> ₹{booking.total_amount}
                                                </p>

                                                <div className="d-flex justify-content-between">

                                                    <Link
                                                        to={`/bookingdetails/${booking._id}`}
                                                        className="btn btn-outline-primary btn-sm"
                                                    >
                                                        View Details
                                                    </Link>

                                                    {
                                                        booking.booking_status === "Completed" && (
                                                            <Link
                                                                to={`/feedback/${booking._id}`}
                                                                className="btn btn-success btn-sm"
                                                            >
                                                                Give Feedback
                                                            </Link>
                                                        )
                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="alert alert-info text-center">
                                        No bookings found.
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyBookings
