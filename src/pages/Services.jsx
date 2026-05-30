import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Breadcrumbs from '../common/Breadcrumbs'
import Footer from '../common/Footer'
import Appointment from '../common/Appointment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BASE_URL from '../config'

function Services() {
    return (
        <div>
            <ServicesContent />
        </div>
    )
}

function ServicesContent() {
    return (
        <>
            <Header />
            <Breadcrumbs title="Services" />
            <ServicesCads />
            <WhyToChoose />
            <Appointment />
            <Footer />
        </>
    )
}

function ServicesCads() {
    let [services, SetServices] = useState([])
    let [loading, SetLoading] = useState(false)
    let [error, SetError] = useState("")

    async function FetchServices() {
        try {
            SetLoading(true)
            let res = await axios.get(`${BASE_URL}/api/services`)
            console.log(res)
            SetServices(res.data.services)
        } catch (e) {
            SetError("APi Closed")
        } finally {
            setTimeout(() => {
                SetLoading(false)
            }, 2000
            );
        }
    }

    useEffect(() => {
        FetchServices();
    }, []
    )

    if (error) { return <h3>{error}</h3> }

    return (
        <>
            <section className="section-spacing">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Our Services</span></h2>
                                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loading ? (<><h3>Loading....</h3></>) : (<>
                            {
                                services ? <>
                                    {
                                        services.map((value, index) => {
                                            return (
                                                <>
                                                    <div className="col-md-4" key={index}>
                                                        <div className="service-item wow fadeIn">
                                                            <div className="thumb">
                                                                <Link to={`/ServiceDetails/${value._id}`}><img src={value.service_image ? `${BASE_URL}${value.service_image}` : "/img/serviceImage.jpg"} alt /></Link>
                                                            </div>
                                                            <div className="service-info text-center">
                                                                <h3><Link to={`/ServiceDetails/${value._id}`}>{value.service_name}</Link></h3>
                                                                <p>{value.service_description}</p>
                                                                <Link to={`/ServiceDetails/${value._id}`} className="btn btn-default">Read More</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        )
                                    }
                                </> : <><h2>No Services Are Available</h2></>
                            }
                        </>)}

                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <a href="contact-us.html" className="btn btn-primary">Contact us</a>
                        </div>
                    </div>
                </div>
            </section>
            {/* end services */}
        </>
    )
}

function WhyToChoose() {
    return (
        <>
            <section className="section-spacing inverse-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="img-block wow fadeIn">
                                <img src="img/why-choose/1.jpg" alt />
                                <div className="play-button">
                                    <a href="#" data-toggle="modal" data-target="#video-modal"><i className="fa fa-play" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="text-block wow fadeIn">
                                <h2>Why Choose us?</h2>
                                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
                                <ul>
                                    <li>Created from natural herbs</li>
                                    <li>100% safe for your skin</li>
                                    <li>Unique from other spa treatments</li>
                                    <li>Created by medical professionals of spa lab</li>
                                    <li>Special gifts &amp; offers for you</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end why choose */}

        </>
    )
}

export default Services
