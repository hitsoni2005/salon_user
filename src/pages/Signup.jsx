import axios from 'axios';
import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../config';

function Signup() {
    return (
        <div>
            <SignupContent />
        </div>
    )
}

function SignupContent() {
    return (
        <>
            <SignupForm />
        </>
    )
}

function SignupForm() {
    let [loading, SetLoading] = useState(false)
    let navigate = useNavigate();
    let [user, setUser] = useState({
        full_name: "",
        email: "",
        mobile_no: "",
        city: "",
        password: ""
    })
    function handleInputChange(e) {
        let { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }
        ))
    }

    let handleSubmit = async (e) => {
        SetLoading(true);
        e.preventDefault();
        try {
            let response = await axios.post(`${BASE_URL}/api/signup`, user)
            setUser({
                full_name: "",
                email: "",
                mobile_no: "",
                city: "",
                password: ""
            })
            if (response.data.success) {
                alert(response.data.message);
                navigate("/Login")
            }
            SetLoading(false)
        } catch (e) {
            setUser({
                full_name: "",
                email: "",
                mobile_no: "",
                city: "",
                password: ""
            })
            alert(e.response.data.message || "Signus Failed");

        }
        SetLoading(false)
    }

    return (
        <>
            <section className="section-spacing">
                <div className="container">

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
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input placeholder="Full Name" value={user.full_name} id="full_name" onChange={handleInputChange} className="form-control" name="full_name" type="text" required data-error="Please enter your full name" />
                                            <div className="help-block with-errors" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input placeholder="Email Address" id="email" value={user.email} onChange={handleInputChange} className="form-control" name="email" type="email" required data-error="Please enter your valid email address" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Enter Phone" id="mobile_no" value={user.mobile_no} onChange={handleInputChange} className="form-control" name="mobile_no" type="tel" required data-error="Please enter your valid mobile number" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Enter City" id="city" value={user.city} onChange={handleInputChange} className="form-control" name="city" type="text" required data-error="Please enter your city" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Enter Password" id="email" value={user.password} onChange={handleInputChange} className="form-control" name="password" type="password" required data-error="Please enter your password" />
                                    <div className="help-block with-errors" />
                                </div>
                                <div className="text-center">
                                    <input value={loading ? "Creating Account...." : "Signup"} name="submit" className="btn btn-primary" type="submit" />
                                    <div id="msgSubmit" className="hidden" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* end contact */}
        </>
    )
}

export default Signup
