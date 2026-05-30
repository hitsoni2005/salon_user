import React, { useState } from 'react'
import Header from '../common/Header'
import Breadcrumbs from '../common/Breadcrumbs'
import Appointment from '../common/Appointment'
import Footer from '../common/Footer'
import api from '../utils/AxiosConfig'

function Contactus() {
    let [loading, SetLoading] = useState(false);
    let [inquiry, SetInquiry] = useState({
        inquiry_subject: "",
        inquiry_message: ""
    })
    console.log(inquiry);

    const handleInputChange = (e) => {
        SetInquiry((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            SetLoading(true)
            let res = await api.post("/api/addgeneralinquery", inquiry)
            if (res.data.success) {
                console.log(res.data)
                // alert(res.data.message)
                SetInquiry({
                    inquiry_message: "",
                    inquiry_subject: ""
                })
                SetLoading(false)
            }
        } catch (e) {
            // console.log(e.res.data.message)
            SetInquiry({
                inquiry_message: "",
                inquiry_subject: ""
            })
            SetLoading(false)
        }
    }

    return (
        <div>
            <Header />
            <Breadcrumbs title="Contact Us" />
            <section className="section-spacing">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="contact-info text-center wow fadeIn">
                                <i className="fa fa-phone-square" />
                                <h3>Make a Call</h3>
                                <p><a href="tel:+61383766284">+61 3 8376 6284</a><br /><a href="tel:+61383766284">+61 3 8376 6284</a></p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info text-center wow fadeIn">
                                <i className="fa fa-envelope-open-o" />
                                <h3>Send a Mail</h3>
                                <p><a href="mailto:info@example.com">info@example.com</a><br /><a href="mailto:info@example.com">info@example.com</a></p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info text-center wow fadeIn">
                                <i className="fa fa-map-marker" />
                                <h3>Find Us</h3>
                                <p>123 West Street, Melbourne <br />Victoria 3000 Australia</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title text-center">
                                <h2><span>Have Any Question?</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-8 offset-lg-2">
                            <form id="contactForm" onSubmit={handleSubmit} className="contact-form wow fadeIn" data-toggle="validator" method="post">

                                <div className="form-group">
                                    <input placeholder="Subject" onChange={handleInputChange} value={inquiry.inquiry_subject} id="subject" className="form-control" name="inquiry_subject" type="text" required data-error="Please enter subject" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="Your Comments" onChange={handleInputChange} value={inquiry.inquiry_message} name='inquiry_message' id="message" cols={20} rows={8} className="form-control" required data-error="Please enter your comments" defaultValue={""} />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="text-center">
                                    <input value={loading ? "Message Seding..." : "Send Message"} name="submit" className="btn btn-primary" type="submit" />
                                    <div id="msgSubmit" className="hidden" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* end contact */}
            <Appointment />
            <Footer />
        </div>
    )
}

export default Contactus
