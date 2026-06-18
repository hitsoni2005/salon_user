import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BASE_URL from '../config'
import CheckToken from '../utils/CheckToken'
import Breadcrumbs from '../common/Breadcrumbs'
import Appointment from '../common/Appointment'

function MyInquiries() {
    return (
        <div>
            <MyInquiriesContent />
        </div>
    )
}

function MyInquiriesContent() {
    return (
        <>
            <Breadcrumbs title="My Inquries" />
            <MyInquiriesCard />
            <Appointment />
        </>
    )
}

function MyInquiriesCard() {
    let user_id = useLocation().pathname.split("/")[2]
    console.log(user_id)
    let [inquiries, SetInquiries] = useState([])
    let [loading, SetLoading] = useState(true)
    let [error, SetError] = useState("")

    async function FetchInquiries() {
        try {
            let res = await axios.get(`${BASE_URL}/api/getinquiries/${user_id}`, {
                headers: {
                    Authorization: "bearer " + CheckToken()
                }
            })
            console.log(res.data)
            SetInquiries(res.data.getInquiries)
        } catch (error) {
            SetError(error)
        } finally {
            SetLoading(false)
        }
    }

    useEffect(() => {
        FetchInquiries();
    }, []
    )

    if (error) return <h2>{error}</h2>
    return (
        <>
            <section className="section-spacing">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>My Inquiries</span></h2>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">

                        {
                            inquiries ? (
                                inquiries.map((inquiry) => (

                                    <div
                                        className="col-md-6 col-lg-6"
                                        key={inquiry._id}
                                    >

                                        <div className="card shadow-sm border-0 h-100">

                                            <div className="card-body">

                                                <div className="d-flex justify-content-between align-items-center mb-3">

                                                    <h5 className="mb-0">
                                                        {inquiry.inquiry_subject}
                                                    </h5>

                                                    <span
                                                        className={`badge ${inquiry.status === "Closed"
                                                            ? "badge-success"
                                                            : "badge-warning"
                                                            }`}
                                                    >
                                                        {inquiry.status}
                                                    </span>

                                                </div>

                                                <p className="text-muted">
                                                    {inquiry.inquiry_message}
                                                </p>

                                                <hr />

                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <small className="text-muted">
                                                            Inquiry Date
                                                        </small>

                                                        <p>
                                                            {inquiry.inquiry_date}
                                                        </p>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <small className="text-muted">
                                                            Closed At
                                                        </small>

                                                        <p>
                                                            {
                                                                inquiry.closed_at
                                                                    ? inquiry.closed_at
                                                                    : "Still Open"
                                                            }
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="alert alert-info text-center">
                                        No inquiries found.
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

export default MyInquiries
