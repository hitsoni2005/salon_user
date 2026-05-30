import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../common/Breadcrumbs'
import Appointment from '../common/Appointment'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from '../common/Footer'
import Header from '../common/Header'
import BASE_URL from '../config'

function ServiceByCategory() {
    return (
        <div>
            <Header />
            <ServicesContent />
            <Footer />
        </div>
    )
}

function ServicesContent() {
    return (
        <>
            <Breadcrumbs title="Services" />
            <ServiceCard />
            <Appointment />
        </>
    )
}

function ServiceCard() {
    let id = useLocation().pathname.split("/")[2];
    let [loading, SetLoading] = useState(false);
    let [error, SetError] = useState("");
    let [services, SetServices] = useState([]);

    async function FetchServices() {
        try {
            SetLoading(true);
            let res = await axios.get(`${BASE_URL}/api/servicesbycategory?category_id=${id}`)
            console.log(res.data)
            SetServices(res.data.data)
        } catch (e) {
            SetError(e)
        } finally {
            setTimeout(() => {
                SetLoading(false)
            }, 2000);
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
                                                                <a href={`/ServiceDetails/${value._id}`}><img src={value.service_image} alt /></a>
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

export default ServiceByCategory
