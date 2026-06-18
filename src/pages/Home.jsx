import React, { useEffect, useState } from 'react'
import Appointment from '../common/Appointment'
import Team from '../common/Team'
import Header from '../common/Header'
import Footer from '../common/Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BASE_URL from '../config'

function Home() {
    return (
        <div>
            <Header />
            <HomeContent />
            <Footer />
        </div>
    )
}

function HomeContent() {
    return (
        <>
            <HomeBanner />
            <HomeServices />
            <HomeChoose />
            <HomePricing />
            <HomeGallery />
            <Appointment />
            <Team />
            <HomeFacts />
            <HomeTestomonials />
        </>
    )
}

function HomeBanner() {
    return (
        <>
            <section className="carousel slide" id="banner" data-ride="carousel" data-pause="false">
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ backgroundImage: 'url(img/banner/slide-1.jpg)' }}>
                        <div className="banner-caption">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="hero-text">
                                            <h6 className="animated fadeInDown">Consetetur Adipiscing</h6>
                                            <h1 className="animated fadeInUp">Soft &amp; Pure Spa Salon</h1>
                                            <p className="animated fadeInUp">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt ullamcorper magna, in tincidunt ex auctor et.</p>
                                            <Link to="/Contactus" className="btn btn-primary animated fadeInUp">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: 'url(img/banner/slide-2.jpg)' }}>
                        <div className="banner-caption">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="hero-text">
                                            <h6 className="animated fadeInLeft">Consetetur Adipiscing</h6>
                                            <h1 className="animated fadeInLeft">Soft &amp; Pure Spa Salon</h1>
                                            <p className="animated fadeInLeft">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt ullamcorper magna, in tincidunt ex auctor et.</p>
                                            <Link to="/Contactus" className="btn btn-primary animated fadeInLeft">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: 'url(img/banner/slide-3.jpg)' }}>
                        <div className="banner-caption">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="hero-text">
                                            <h6 className="animated fadeInRight">Consetetur Adipiscing</h6>
                                            <h1 className="animated fadeInRight">Soft &amp; Pure Spa Salon</h1>
                                            <p className="animated fadeInRight">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt ullamcorper magna, in tincidunt ex auctor et.</p>
                                            <Link to="/Contactus" className="btn btn-primary animated fadeInRight">Contact Us</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ol className="carousel-indicators">
                        <li data-target="#banner" data-slide-to={0} className="active" />
                        <li data-target="#banner" data-slide-to={1} />
                        <li data-target="#banner" data-slide-to={2} />
                    </ol>
                </div>
            </section>
            {/* end banner */}
        </>
    )
}

function HomeServices() {
    let [service, SetServices] = useState([])
    let [loading, SetLoading] = useState(false)
    let [error, SetError] = useState("")
    async function FetchServices() {
        try {
            SetLoading(true)
            let res = await axios.get(`${BASE_URL}/api/services`)
            console.log(res)
            SetServices(res.data.services.slice(0, 3))
        } catch (e) {
            console.log(e.message);

            SetError(e)
        } finally {
            setTimeout(() => {
                SetLoading(false)
            }, 2000
            )
        }
    }
    useEffect(() => {
        FetchServices();
    }, []
    )
    if (error) { return <h3>{error.message}</h3> }

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
                        {
                            loading ? (<><h2>Loading....</h2></>) : (<>
                                {
                                    service.length > 0 ? (<>
                                        {
                                            service.map((value, index) => {
                                                return (
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
                                                )
                                            }
                                            )
                                        }
                                    </>) : (<><h3>No Services Are Found</h3></>)
                                }
                            </>)
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Link to="/Services" className="btn btn-primary">All Services</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* end services */}
        </>
    )
}

function HomeChoose() {
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

function HomePricing() {
    return (
        <>
            <section className="section-spacing">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Cheapest pricing plan</span></h2>
                                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="pricing-table wow fadeIn">
                                <div className="thumb">
                                    <img src="img/pricing/1.jpg" alt />
                                </div>
                                <div className="pricing-info text-center">
                                    <h3>Basic</h3>
                                    <ul>
                                        <li>Nail Cutting</li>
                                        <li>Hair Coloring</li>
                                        <li>Spa Therapy</li>
                                        <li>Body massage</li>
                                        <li>Manicure</li>
                                    </ul>
                                    <h2><sub>$</sub>29.00</h2>
                                    <Link to="/Contactus" className="btn btn-default">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="pricing-table wow fadeIn">
                                <div className="thumb">
                                    <img src="img/pricing/2.jpg" alt />
                                </div>
                                <div className="pricing-info text-center">
                                    <h3>Medium</h3>
                                    <ul>
                                        <li>Nail Cutting</li>
                                        <li>Hair Coloring</li>
                                        <li>Spa Therapy</li>
                                        <li>Body massage</li>
                                        <li>Manicure</li>
                                    </ul>
                                    <h2><sub>$</sub>39.00</h2>
                                    <Link to="/Contactus" className="btn btn-default">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="pricing-table wow fadeIn">
                                <div className="thumb">
                                    <img src="img/pricing/3.jpg" alt />
                                </div>
                                <div className="pricing-info text-center">
                                    <h3>Ultimate</h3>
                                    <ul>
                                        <li>Nail Cutting</li>
                                        <li>Hair Coloring</li>
                                        <li>Spa Therapy</li>
                                        <li>Body massage</li>
                                        <li>Manicure</li>
                                    </ul>
                                    <h2><sub>$</sub>49.00</h2>
                                    <Link to="/Contactus" className="btn btn-default">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end pricing */}
        </>
    )
}

function HomeGallery() {
    let [category, SetCategory] = useState([])
    let [loading, SetLoading] = useState(false)
    let [error, SetError] = useState("")
    async function FetchCategory() {
        try {
            SetLoading(true)
            let res = await axios.get(`${BASE_URL}/api/categories`)
            console.log(res)
            SetCategory(res.data.categories.slice(0, 3))
        } catch (e) {
            SetError(e)
        } finally {
            setTimeout(() => {
                SetLoading(false)
            }, 2000
            )
        }
    }
    useEffect(() => {
        FetchCategory();
    }, []
    )
    if (error) { return <h2>{error}</h2> }

    return (
        <>
            <section className="section-spacing inverse-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Our Categories</span></h2>
                                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {loading ? <><h2>Laoding....</h2></> : (<>
                            {
                                category.length > 0 ?
                                    <>
                                        {
                                            category.map((value, index) => {
                                                return (
                                                    <>
                                                        <div className="col-sm-6 col-md-4" key={index}>
                                                            <div className="gallery-item wow fadeIn">
                                                                <Link to={`/SubCategoryByCategory/${value._id}`} className="venobox" data-gall="gallery">
                                                                    <img src={value.category_image ? `${BASE_URL}${value.category_image}` : "/img/categories.jpg"} alt />
                                                                    <div className="gallery-caption text-center">
                                                                        <i className="fa fa-heart-o" />
                                                                        <p>{value.category_name}</p>
                                                                        <h3>{value.category_description}</h3>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            )
                                        }
                                    </> : <><h3>No Categories Found</h3></>
                            }

                        </>)}
                    </div>
                </div>
            </section>
            {/* end gallery */}
        </>
    )
}

function HomeFacts() {
    return (
        <>
            <section className="section-spacing">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="fun-fact-img wow fadeIn">
                                <img className="tilt-img" src="img/fun-facts/1.png" alt />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 text-center">
                                    <div className="features-info">
                                        <span className="counter">800</span>
                                        <h3>Clients</h3>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 text-center">
                                    <div className="features-info">
                                        <span className="counter">50</span>
                                        <h3>Therapists</h3>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 text-center">
                                    <div className="features-info">
                                        <span className="counter">35</span>
                                        <h3>Procedures</h3>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 text-center">
                                    <div className="features-info">
                                        <span className="counter">890</span>
                                        <h3>Treatments</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end fun facts */}
        </>
    )
}

function HomeTestomonials() {
    return (
        <>
            <section className="section-spacing inverse-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Happy Clients</span></h2>
                                <p>Our product is fully personalized and well balanced for all age of customers or adults. We maintain the standards by lorem ipsum and certified by dolor set amet.</p>
                            </div>
                        </div>
                    </div>
                    <div className="owl-carousel testimonial-carousel">
                        <div className="testimonial-list">
                            <div className="author-comment">
                                <div className="quote">
                                    <i className="fa fa-quote-left" />
                                </div>
                                <p>Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with ‘real’ content. This is required when, for example, the final text is not yet available.</p>
                            </div>
                            <div className="author-info">
                                <div className="author_thumb">
                                    <img src="img/testimonials/1.png" alt />
                                </div>
                                <div className="author-meta">
                                    <span className="author-name">David Warner</span>
                                    <span className="designation"><em>Envato Customer</em></span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-list">
                            <div className="author-comment">
                                <div className="quote">
                                    <i className="fa fa-quote-left" />
                                </div>
                                <p>Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with ‘real’ content. This is required when, for example, the final text is not yet available.</p>
                            </div>
                            <div className="author-info">
                                <div className="author_thumb">
                                    <img src="img/testimonials/2.png" alt />
                                </div>
                                <div className="author-meta">
                                    <span className="author-name">Alex Smith</span>
                                    <span className="designation"><em>Envato Customer</em></span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-list">
                            <div className="author-comment">
                                <div className="quote">
                                    <i className="fa fa-quote-left" />
                                </div>
                                <p>Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with ‘real’ content. This is required when, for example, the final text is not yet available.</p>
                            </div>
                            <div className="author-info">
                                <div className="author_thumb">
                                    <img src="img/testimonials/3.png" alt />
                                </div>
                                <div className="author-meta">
                                    <span className="author-name">David Warner</span>
                                    <span className="designation"><em>Envato Customer</em></span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-list">
                            <div className="author-comment">
                                <div className="quote">
                                    <i className="fa fa-quote-left" />
                                </div>
                                <p>Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with ‘real’ content. This is required when, for example, the final text is not yet available.</p>
                            </div>
                            <div className="author-info">
                                <div className="author_thumb">
                                    <img src="img/testimonials/1.png" alt />
                                </div>
                                <div className="author-meta">
                                    <span className="author-name">Alex Smith</span>
                                    <span className="designation"><em>Envato Customer</em></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end team testimonials */}
        </>
    )
}

export default Home
