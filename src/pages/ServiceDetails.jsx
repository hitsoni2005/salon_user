import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../common/Breadcrumbs'
import Appointment from '../common/Appointment'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../utils/AxiosConfig'
import BASE_URL from '../config'

function ServiceDetails() {
    return (
        <div>
            <Header />
            <ServiceDetailsContent />
            <Footer />
        </div>
    )
}

function ServiceDetailsContent() {
    return (
        <>
            <Breadcrumbs title="Service Details" />
            <ServiceDetailsCard />
        </>
    )
}

function ServiceDetailsCard() {
    let id = useLocation().pathname.split("/")[2];
    console.log(id)
    let [loading, SetLoading] = useState(true);
    let [error, SetError] = useState("")
    let navigate = useNavigate()
    let [ServiceDetails, SetServicesDetails] = useState({});

    let [booking, SetBooking] = useState({
        service_id: id,
        booking_date: "",
        notes: ""
    })

    async function FetchServiceDetails() {
        try {
            let res = await axios.get(`${BASE_URL}/api/services/${id}`)
            console.log(res.data)
            SetServicesDetails(res.data.serviceDetails)
        } catch (e) {
            SetError(e)
        } finally {
            SetLoading(false)
        }
    }

    function handleInputChange(e) {
        SetBooking((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }
    console.log(booking)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let bookingres = await api.post("/api/bookservice", booking);
            console.log(bookingres.data)
            if (bookingres.data.success) {
                SetBooking({
                    service_id: id,
                    booking_date: "",
                    notes: ""
                })
                try {
                    let orderresponse = await api.post("/api/genorder", { booking_id: bookingres.data.booking_id })
                    console.log(orderresponse.data.data)
                    if (orderresponse.data.success) {
                        const { total_amount, currency, order_id } = orderresponse.data.data;
                        const booking_id = orderresponse.data.booking_id;
                        // Set up RazorPay options
                        const options = {
                            key: "rzp_test_VQhEfe2NCXbbwI", // Replace with your RazorPay Key ID
                            amount: total_amount,
                            currency: currency,
                            name: "Salon Platform",
                            description: "Test Transaction",
                            order_id: order_id,
                            handler: async (paymentresponse) => {
                                console.log(paymentresponse)
                                // alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                                try {
                                    let verifyresponse = await api.post("/api/verifypayment", {
                                        razorpay_order_id: paymentresponse.razorpay_order_id,
                                        razorpay_payment_id: paymentresponse.razorpay_payment_id,
                                        razorpay_signature: paymentresponse.razorpay_signature,
                                        booking_id: booking_id
                                    })
                                    console.log(verifyresponse)
                                    if (verifyresponse.data.success) {
                                        alert(verifyresponse.data.message)
                                        navigate("/Services")
                                    }
                                } catch (e) {
                                    console.log(e)
                                }
                            },
                            prefill: {
                                name: "John Doe",
                                email: "john.doe@example.com",
                                contact: "9999999999",
                            },
                            theme: {
                                color: "#3399cc",
                            },
                        };

                        const paymentObject = new window.Razorpay(options);
                        paymentObject.open();

                    }
                } catch (e) {
                    console.log(e)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        FetchServiceDetails();
    }, [id]
    )
    if (error) return <h3>{error}</h3>

    return (
        <>
            {
                loading ? (<><h3>Loading....</h3></>) :
                    (<>
                        <section className="section-spacing">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="service-item wow fadeIn">
                                            <div className="thumb">
                                                <a href="service-single.html"><img src={ServiceDetails.service_image ? `${BASE_URL}${ServiceDetails.service_image}` : "/img/serviceImage.jpg"} alt="" /></a>
                                            </div>
                                            <div className="service-info text-center">
                                                <h3><a href="service-single.html">{ServiceDetails.service_name}</a></h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 col-lg-8 offset-lg-2">
                                                    <form id="contactForm" onSubmit={handleSubmit} className="contact-form wow fadeIn" data-toggle="validator" method="post">

                                                        <div className="form-group">
                                                            <input onChange={handleInputChange} id="booking_date" className="form-control" name="booking_date" type="date" required data-error="Please enter Date" />
                                                            <div className="help-block with-errors" />
                                                        </div>
                                                        <div className="form-group">
                                                            <textarea placeholder="Your Notes" onChange={handleInputChange} name='notes' id="notes" cols={20} rows={8} className="form-control" required data-error="Please enter your Message" defaultValue={""} />
                                                            <div className="help-block with-errors" />
                                                        </div>
                                                        <div className="text-center">
                                                            <input value={loading ? "Booking..." : "Book Now"} name="submit" className="btn btn-primary" type="submit" />
                                                            <div id="msgSubmit" className="hidden" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="service-details">
                                            <h3>Duration: {ServiceDetails.duration_mins}<br />Rs. {ServiceDetails.price}</h3>
                                            <p>Category: {ServiceDetails.category_name}</p>
                                            <p>Status: {ServiceDetails.status}</p>
                                            <p>{ServiceDetails.service_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* end services */}
                    </>)
            }

        </>
    )
}

export default ServiceDetails